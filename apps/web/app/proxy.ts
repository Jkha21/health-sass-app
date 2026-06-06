// proxy.ts (root level)
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES: string[] = [
  "/dashboard", "/patients", "/analytics", "/appointments",
  "/records", "/prescriptions", "/lab-results", "/telehealth", "/settings"
];
const AUTH_ROUTES: string[] = ["/", "/login"];
const PUBLIC_ROUTES: string[] = ["/offline"];

function getSessionToken(req: NextRequest): string | undefined {
  return req.cookies.get("session")?.value ??
         req.cookies.get("__session")?.value ??
         req.cookies.get("auth-token")?.value;
}

function isProtected(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return false;
  return PROTECTED_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`));
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`));
}

// Lightweight JWT decode (no signature verification, just expiration check)
function isTokenExpired(token: string): boolean {
  try {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
    const exp = payload.exp;
    if (!exp) return true;
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export async function proxy(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  // Public routes pass through
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = getSessionToken(req);
  let isLoggedIn = false;

  if (token && !isTokenExpired(token)) {
    isLoggedIn = true;
  }

  // Redirect logged-in users away from auth routes
  if (isLoggedIn && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (!isLoggedIn && isProtected(pathname)) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// ✅ Add matcher to run middleware only on relevant routes (improves performance)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};