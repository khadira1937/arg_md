import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "cloudyn_session";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET ?? "");

async function getRole(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return (payload.role as string) ?? "CUSTOMER";
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const role = await getRole(req);

  // Admin area: staff only
  if (pathname.startsWith("/admin")) {
    if (!role) {
      const url = new URL("/login", req.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (role !== "ADMIN" && role !== "SUPPORT") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Customer dashboard + checkout: any authenticated user
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/checkout")) {
    if (!role) {
      const url = new URL("/login", req.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/checkout/:path*"],
};
