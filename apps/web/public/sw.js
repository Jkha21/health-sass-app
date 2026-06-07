/* ═══════════════════════════════════════════════════════════
   HealthSaaS — Service Worker  (public/sw.js)
   Auto-generated from src/sw.ts
   ═══════════════════════════════════════════════════════════ */
"use strict";

const CACHE = "healthsaas-v1";

/* ─── Install ────────────────────────────────────────────── */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(["/"]).catch(() => {}))
  );
  self.skipWaiting();
});

/* ─── Activate ───────────────────────────────────────────── */
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

/* ─── Fetch: network-first, fallback to cache ────────────── */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

/* ─── Push ───────────────────────────────────────────────── */
self.addEventListener("push", (e) => {
  const defaults = {
    title: "HealthSaaS",
    body:  "You have a new notification.",
    type:  "info",
    url:   "/dashboard",
  };

  let payload = { ...defaults };

  if (e.data) {
    try   { payload = { ...defaults, ...e.data.json() }; }
    catch { payload = { ...defaults, body: e.data.text() }; }
  }

  const options = {
    body:               payload.body,
    icon:               "/icons/icon-192.png",
    badge:              "/icons/badge-72.png",
    tag:                `healthsaas-${payload.type}`,
    data:               { url: payload.url },
    vibrate:            [200, 100, 200],
    requireInteraction: payload.type === "urgent",
    actions: [
      { action: "view",    title: "View"    },
      { action: "dismiss", title: "Dismiss" },
    ],
  };

  e.waitUntil(self.registration.showNotification(payload.title, options));
});

/* ─── Notification click ─────────────────────────────────── */
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  if (e.action === "dismiss") return;

  const target = e.notification.data?.url ?? "/dashboard";

  e.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            client.focus();
            client.postMessage({ type: "SW_NAV", url: target });
            return;
          }
        }
        if (self.clients.openWindow) return self.clients.openWindow(target);
      })
  );
});