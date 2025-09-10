import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const protectedRoutes = ["/", "/settings", "/create"];
  const notProtectedRoutes = ["/login", "/register"];

  // Getting the session cookie
  const sessionCookie = getSessionCookie(request);

  // Checking if the user is not logged in
  if (protectedRoutes.includes(request.nextUrl.pathname) && !sessionCookie) {
    return NextResponse.redirect(new URL("/register", request.url));

    // Checking if the user is logged in
  } else if (notProtectedRoutes.includes(request.nextUrl.pathname) && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
