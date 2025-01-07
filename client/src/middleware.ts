import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isUserProtectedRoute = (route: string) =>
  route.startsWith("/u") || route.startsWith("/pin");

export function middleware(req: NextRequest) {
  const token = req.cookies.get("user")?.value;
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/u/home", req.url));
  }

  switch (true) {
    case token && pathname === "/":
      url.pathname = "/u/home";
      return NextResponse.rewrite(url);

    case isUserProtectedRoute(pathname) && !token:
      url.pathname = "/";
      return NextResponse.redirect(url);

    case token && ["/signin", "/signup"].includes(pathname):
      url.pathname = "/u/home";
      return NextResponse.redirect(url);

    default:
      return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!home|_next|_next/static|_next/image|images|favicon.ico|reset-password|forgot-password|pinterest-color-svgrepo-com.svg).*)",
    "/pin/:path*",
  ],
};
