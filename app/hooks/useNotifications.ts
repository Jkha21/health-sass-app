"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ─── Types ──────────────────────────────────────────────── */
export type NotifType       = "urgent" | "warning" | "info" | "success";
export type NotifPermission = "default" | "granted" | "denied";

export interface AppNotif {
  id:        string;
  title:     string;
  body:      string;
  type:      NotifType;
  timestamp: Date;
  read:      boolean;
  url?:      string;
}

export interface SendOpts {
  title:               string;
  body:                string;
  type?:               NotifType;
  url?:                string;
  tag?:                string;
  requireInteraction?: boolean;
}

export interface UseNotificationsReturn {
  /* state */
  permission:     NotifPermission;
  swReady:        boolean;
  pushSubscribed: boolean;
  notifications:  AppNotif[];
  unreadCount:    number;
  /* actions */
  requestPermission:          () => Promise<NotifPermission>;
  sendLocalNotification:      (opts: SendOpts) => Promise<void>;
  subscribeToPush:            () => Promise<boolean>;
  unsubscribeFromPush:        () => Promise<void>;
  markRead:                   (id: string) => void;
  markAllRead:                () => void;
  remove:                     (id: string) => void;
  clearAll:                   () => void;
  /* demo triggers */
  triggerAppointmentReminder: () => void;
  triggerUrgentAlert:         () => void;
  triggerLabResults:          () => void;
}

/*
 * Replace with your VAPID public key:
 *   npx web-push generate-vapid-keys
 */
const VAPID_PUBLIC_KEY =
  "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U";

function b64ToUint8(b64: string): Uint8Array {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

let _counter = 0;
const uid = (): string => `n_${Date.now()}_${++_counter}`;

/* ─── Hook ───────────────────────────────────────────────── */
export function useNotifications(): UseNotificationsReturn {
  const [permission,     setPermission]     = useState<NotifPermission>("default");
  const [swReady,        setSwReady]        = useState<boolean>(false);
  const [pushSubscribed, setPushSubscribed] = useState<boolean>(false);
  const [notifications,  setNotifications]  = useState<AppNotif[]>([]);

  const swReg = useRef<ServiceWorkerRegistration | null>(null);

  /* ── Register SW + read current state ── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("Notification" in window) {
      setPermission(Notification.permission as NotifPermission);
    }

    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then(async (reg: ServiceWorkerRegistration) => {
        swReg.current = reg;
        setSwReady(true);
        const sub = await reg.pushManager?.getSubscription();
        if (sub) setPushSubscribed(true);
      })
      .catch((err: unknown) => console.error("[SW] registration failed:", err));

    /* Handle SW → page navigation messages */
    navigator.serviceWorker.addEventListener(
      "message",
      (e: MessageEvent<{ type: string; url: string }>) => {
        if (e.data?.type === "SW_NAV") window.location.href = e.data.url;
      }
    );
  }, []);

  /* ── Request browser permission ── */
  const requestPermission = useCallback(async (): Promise<NotifPermission> => {
    if (!("Notification" in window)) return "denied";
    const result = await Notification.requestPermission();
    setPermission(result as NotifPermission);
    return result as NotifPermission;
  }, []);

  /* ── Add to in-app inbox ── */
  const addToInbox = useCallback((opts: SendOpts): void => {
    const notif: AppNotif = {
      id:        uid(),
      title:     opts.title,
      body:      opts.body,
      type:      opts.type ?? "info",
      timestamp: new Date(),
      read:      false,
      url:       opts.url,
    };
    setNotifications((prev) => [notif, ...prev].slice(0, 50));
  }, []);

  /* ── Send local notification + add to inbox ── */
  const sendLocalNotification = useCallback(
    async (opts: SendOpts): Promise<void> => {
      addToInbox(opts);

      let perm = permission;
      if (perm === "default") perm = await requestPermission();
      if (perm !== "granted") return;

      const options: NotificationOptions = {
        body:    opts.body,
        icon:    "/icons/icon-192.png",
        badge:   "/icons/badge-72.png",
        tag:     opts.tag ?? uid(),
        data:    { url: opts.url ?? "/dashboard" },
        vibrate: [200, 100, 200],
        requireInteraction: opts.requireInteraction ?? false,
        actions: [
          { action: "view",    title: "View"    },
          { action: "dismiss", title: "Dismiss" },
        ],
      } as NotificationOptions;

      if (swReg.current) {
        await swReg.current.showNotification(opts.title, options);
      } else {
        new Notification(opts.title, options);
      }
    },
    [permission, requestPermission, addToInbox]
  );

  /* ── Subscribe to Web Push ── */
  const subscribeToPush = useCallback(async (): Promise<boolean> => {
    if (!swReg.current) return false;

    let perm = permission;
    if (perm === "default") perm = await requestPermission();
    if (perm !== "granted") return false;

    try {
      const sub: PushSubscription = await swReg.current.pushManager.subscribe({
        userVisibleOnly:      true
      });
      /* TODO: POST sub.toJSON() to your backend to store per-user */
      console.info("[Push] subscribed:", JSON.stringify(sub.toJSON()));
      setPushSubscribed(true);
      return true;
    } catch (err: unknown) {
      console.error("[Push] subscribe failed:", err);
      return false;
    }
  }, [permission, requestPermission]);

  /* ── Unsubscribe from Web Push ── */
  const unsubscribeFromPush = useCallback(async (): Promise<void> => {
    if (!swReg.current) return;
    const sub = await swReg.current.pushManager.getSubscription();
    if (sub) {
      await sub.unsubscribe();
      /* TODO: DELETE subscription from your backend */
      setPushSubscribed(false);
    }
  }, []);

  /* ── Inbox management ── */
  const markRead = useCallback(
    (id: string): void =>
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      ),
    []
  );

  const markAllRead = useCallback(
    (): void => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
    []
  );

  const remove = useCallback(
    (id: string): void =>
      setNotifications((prev) => prev.filter((n) => n.id !== id)),
    []
  );

  const clearAll = useCallback((): void => setNotifications([]), []);

  /* ══ Working notification use cases ══════════════════════ */

  /** Use case 1 — Appointment reminder (15 min before) */
  const triggerAppointmentReminder = useCallback((): void => {
    sendLocalNotification({
      title: "⏰ Appointment Reminder",
      body:  "Emma Larson · Urgent Review · Room 3 starts in 15 minutes.",
      type:  "warning",
      url:   "/dashboard",
      tag:   "appt-reminder",
    });
  }, [sendLocalNotification]);

  /** Use case 2 — Critical lab result (urgent, stays until dismissed) */
  const triggerUrgentAlert = useCallback((): void => {
    sendLocalNotification({
      title:               "🚨 Critical Lab Result",
      body:                "Emma Larson — critical potassium levels. Immediate review required.",
      type:                "urgent",
      url:                 "/patients",
      tag:                 "urgent-alert",
      requireInteraction:  true,
    });
  }, [sendLocalNotification]);

  /** Use case 3 — Lab results ready (informational) */
  const triggerLabResults = useCallback((): void => {
    sendLocalNotification({
      title: "🧪 Lab Results Ready",
      body:  "John Ramirez — blood panel results are now available for review.",
      type:  "info",
      url:   "/patients",
      tag:   "lab-results",
    });
  }, [sendLocalNotification]);

  const unreadCount: number = notifications.filter((n) => !n.read).length;

  return {
    permission,
    swReady,
    pushSubscribed,
    notifications,
    unreadCount,
    requestPermission,
    sendLocalNotification,
    subscribeToPush,
    unsubscribeFromPush,
    markRead,
    markAllRead,
    remove,
    clearAll,
    triggerAppointmentReminder,
    triggerUrgentAlert,
    triggerLabResults,
  };
}