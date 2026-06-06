// app/api/sessionCheck/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/app/lib/firebase-admin";

// Simple in-memory cache (replace with Redis/Upstash for production with multiple instances)
const sessionCache = new Map<string, any>();

export async function GET(_req: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value || "";

  if (!sessionCookie) {
    return NextResponse.json({ error: "No session cookie" }, { status: 401 });
  }

  // Check cache
  const cached = sessionCache.get(sessionCookie);
  if (cached) {
    return NextResponse.json(cached, { status: 200 });
  }

  try {
    // Expensive verification with revocation check (once per token)
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

    // Cache for 60 seconds – adjust as needed
    sessionCache.set(sessionCookie, decoded);
    setTimeout(() => sessionCache.delete(sessionCookie), 60_000);

    return NextResponse.json(decoded, { status: 200 });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
  }
}