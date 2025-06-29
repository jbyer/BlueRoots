import { isAuthenticated } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = ["/login", "/signup"].includes(path);

  // Redirect authenticated users from auth pages
  if (isPublicPath && isAuthenticated()) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Protect private routes
  if (!isPublicPath && !isAuthenticated()) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin/:path*", 
    "/login",
    "/signup",
  ],
};
