import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";

export default function withAuth(middleware, requireAuth) {
 return async (req, next) => {
  const pathname = req.nextUrl.pathname;

  const res = NextResponse.next();
  res.headers.set(
   "Cache-Control",
   "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  res.headers.set("Surrogate-Control", "no-store");

  if (
   pathname !== "/login" &&
   requireAuth.some((route) => pathname.startsWith(route))
  ) {
   const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
   });

   if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", encodeURI(req.url));
    return NextResponse.redirect(url);
   }

   if (token.role === "owner" && !pathname.startsWith("/owner")) {
    return NextResponse.redirect(new URL("/owner", req.url));
   }

   if (token.role === "admin" && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin", req.url));
   }

   if (token.role === "pelanggan" && !pathname.startsWith("/pelanggan")) {
    return NextResponse.redirect(new URL("/pelanggan", req.url));
   }
  }

  return middleware(req, next);
 };
}
