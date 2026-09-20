import { type NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE } from "@/shared/lib/auth";

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.has(AUTH_COOKIE);
  const { pathname, search } = request.nextUrl;
  const isLoginPage = pathname === "/login";

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/lists", request.url));
  }

  if (!isLoginPage && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/lists/:path*", "/tasks/:path*"],
};
