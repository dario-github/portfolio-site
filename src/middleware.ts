import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLanguage.includes("zh")
    ? "zh"
    : acceptLanguage.includes("en")
      ? "en"
      : defaultLocale;

  // Redirect to locale-prefixed path
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|opengraph-image|feed.xml|llms.txt|llms-full.txt).*)",
  ],
};
