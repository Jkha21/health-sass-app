import { create } from "zustand";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../lib/firebase";

/* ─── Types ──────────────────────────────────────────────── */
export interface User {
  uid:         string;
  displayName: string | null;
  email:       string | null;
  photoURL:    string | null;
}

export interface AuthState {
  user:                    User | null;
  loading:                 boolean;
  error:                   string | null;
  signInWithGoogle:        () => Promise<void>;
  signInWithEmailPassword:  (email: string, password: string) => Promise<void>;
  signOut:                 () => Promise<void>;
  initAuth:                () => () => void;
}

/* ─── Session helpers ────────────────────────────────────── */
async function createSession(firebaseUser: FirebaseUser): Promise<void> {
  const idToken = await firebaseUser.getIdToken(false);
  const res = await fetch("/api/sessionLogin", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ idToken }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(body.error ?? "Failed to create session");
  }
}

async function destroySession(): Promise<void> {
  await fetch("/api/sessionLogin", { method: "DELETE" }).catch(() => {});
}

/* ─── Store ──────────────────────────────────────────────── */
const useAuthStore = create<AuthState>((set) => ({
  user:    null,
  loading: false, // ← false by default, never flipped true except during sign-in
  error:   null,

  /* ── Google sign-in ── */
  signInWithGoogle: async (): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);

      // Create server session ONLY on explicit sign-in
      await createSession(result.user);

      set({
        user: {
          uid:         result.user.uid,
          displayName: result.user.displayName,
          email:       result.user.email,
          photoURL:    result.user.photoURL,
        },
        loading: false,
        error:   null,
      });
    } catch (err: unknown) {
      set({
        loading: false, // ← always reset, no matter what
        error:   err instanceof Error ? err.message : "Sign-in failed. Please try again.",
        user:    null,
      });
    }
  },

  /* ── Email/Password sign-in ── */
  signInWithEmailPassword: async (email: string, password: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Create server session
      await createSession(result.user);

      set({
        user: {
          uid:         result.user.uid,
          displayName: result.user.displayName,
          email:       result.user.email,
          photoURL:    result.user.photoURL,
        },
        loading: false,
        error:   null,
      });
    } catch (err: unknown) {
      set({
        loading: false,
        error:   err instanceof Error ? err.message : "Email/password sign-in failed. Please try again.",
        user:    null,
      });
    }
  },

  /* ── Sign out ── */
  signOut: async (): Promise<void> => {
    set({ loading: true, error: null });
    try {
      await firebaseSignOut(auth);
      await destroySession();
      set({ user: null, loading: false, error: null });
    } catch (err: unknown) {
      set({
        loading: false,
        error:   err instanceof Error ? err.message : "Sign-out failed.",
      });
    }
  },

  /*
   * ── initAuth ──
   * Subscribes to Firebase auth state.
   * Does NOT touch `loading` — that is only for explicit sign-in/out actions.
   * Does NOT call createSession — the server cookie already exists from sign-in.
   * The middleware handles session verification independently.
   */
  initAuth: (): (() => void) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          set({
            user: {
              uid:         firebaseUser.uid,
              displayName: firebaseUser.displayName,
              email:       firebaseUser.email,
              photoURL:    firebaseUser.photoURL,
            },
            error: null,
          });
        } else {
          set({ user: null, error: null });
        }
        // loading is never touched here — it only belongs to sign-in/out
      }
    );
    return unsubscribe;
  },
}));

export default useAuthStore;