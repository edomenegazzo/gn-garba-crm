import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const MOBILE_UA_REGEX = /Mobile|iPhone|iPod|Android.*Mobile|BlackBerry|IEMobile|Opera Mini/i;
const BREAK_GLASS_TOKEN = "garbarossa2026";

function isMobileRequest(request: NextRequest): boolean {
  const ua = request.headers.get("user-agent") || "";
  // iPad moderni si presentano come desktop Safari → escluso correttamente dal regex
  // Android tablet di solito non hanno "Mobile" nello UA → escluso correttamente
  return MOBILE_UA_REGEX.test(ua);
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Eccezioni: pagina di blocco stessa, API pubbliche, asset, login (per evitare loop strani)
  const isException =
    pathname.startsWith("/desktop-only") ||
    pathname.startsWith("/api/public") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico";

  if (!isException && isMobileRequest(request)) {
    // Break glass: query string conosciuta solo all'admin
    const override = searchParams.get("force_desktop");
    if (override !== BREAK_GLASS_TOKEN) {
      const url = request.nextUrl.clone();
      url.pathname = "/desktop-only";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  // Se non bloccato (o è tablet/desktop), procedi con l'auth Supabase
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
