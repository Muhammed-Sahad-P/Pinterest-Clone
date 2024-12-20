import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isUserProtectedRoute = (route: string) => route.startsWith("/u");

export function middleware(req: NextRequest) {
  const token = req.cookies.get("user")?.value;
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  if (!token && isUserProtectedRoute(pathname)) {
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  if (token && (pathname === "/signin" || pathname === "/signup")) {
    url.pathname = "/u/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!home|_next|_next/static|_next/image|images|favicon.ico|reset-password|forgot-password).*)",
  ],
};
