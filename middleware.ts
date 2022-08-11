// middleware.ts
import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // Just try redirectin to login to see if we can even show that page
  //return NextResponse.redirect(new URL("/login", req.url));

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  // If they don't have a token and they are NOT going to the login page and
  // they are not on the api/auth route,  redirect to the login page
  // This means that all other routes are protected, exept login
  if (!token && pathname != "/login" && !pathname.includes("/api/auth")) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/",
};
