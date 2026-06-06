// app/api/sessionLogin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/app/lib/firebase-admin"; // adjust path if needed

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "No ID token provided" },
        { status: 400 }
      );
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in ms

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    const res = NextResponse.json({ success: true });
    res.cookies.set("session", sessionCookie, {
      maxAge: Math.floor(expiresIn / 1000), // cookie expects seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return res;
  } catch (error: any) {
    console.error("Session login error:", {
      message: error?.message,
      code: error?.code,
      stack: error?.stack,
    });

    return NextResponse.json(
      { error: error?.message ?? "Failed to create session" },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });

  // Clear the session cookie on sign-out
  res.cookies.set("session", "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  return res;
}
