import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "cookie";

// List of routes that don't require authentication
const publicRoutes = ["/"];

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get("auth_token");

    if (authToken && publicRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!authToken && !publicRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// Matching the middleware for all routes
export const config = {
    matcher: ["/dashboard",
        "/live",
        "account", "ad", "categories", "clients", "cta", "currency", "featured", "giftcards", "plans", "report", "settings", "suggestions", "support", "upcoming", "uploads/movies", 'uploads/series', "uploads/skits", encodeURI('uploads/music videos'), "users", "withdrawal"], // Add all protected routes here
};