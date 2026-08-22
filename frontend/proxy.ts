import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard"];
// const publicRoutes = ["/login", '/register'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  // const isPublicRoute = publicRoutes.includes(path);
  const cookie = (await cookies()).get("refreshToken")?.value;

  if (path === "/" && cookie) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if ((path === "/" || isProtectedRoute) && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
