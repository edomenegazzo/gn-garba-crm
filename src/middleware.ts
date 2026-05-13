import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const MOBILE_UA_REGEX = /Mobile|iPhone|iPod|Android.*Mobile|BlackBerry|IEMobile|Opera Mini/i;
const BREAK_GLASS_TOKEN = "garbarossa2026";

function isMobileRequest(request: NextRequest): boolean {
  const ua = request.headers.get("user-agent") || "";
  return MOBILE_UA_REGEX.test(ua);
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // /desktop-only: completamente pubblica, salta auth Supabase
  if (pathname.startsWith("/desktop-only")) {
    return NextResponse.next();
  }

  // API pubbliche: nessun controllo (form esterni del sito)
  if (pathname.startsWith("/api/public")) {
    return NextResponse.next();
  }

  // Check mobile su tutto il resto
  if (isMobileRequest(request)) {
    const override = searchParams.get("force_desktop");
    if (override !== BREAK_GLASS_TOKEN) {
      const url = request.nextUrl.clone();
      url.pathname = "/desktop-only";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  // Auth Supabase per tutto il resto (tablet e desktop)
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
