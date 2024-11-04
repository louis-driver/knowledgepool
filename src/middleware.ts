import { NextRequest, NextResponse } from "next/server";
import { decrypt, getSession } from "@/app/lib/session";
import { cookies } from 'next/headers';

// Protected routes
const protectedRoutes = ['/post', '/review'];
const publicRoutes = ['/', '/user/signin', '/user/submit'];

export default async function middleware(req: NextRequest) {
    // Check if route is protected
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    console.log("middleware called for path:", path);


    // Decrypt session from the cookie
    const session = await getSession();
    console.log("Session:", session)

    // Redirect to login if the user is not authenticated 
    if (session == null) {
        return NextResponse.redirect(new URL('/user/signin', req.nextUrl));
    }

    // Redirect to /post if user is authenticated
    if (
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith('/post')
    ) {
        return NextResponse.redirect(new URL('post'))
    }

    return NextResponse.next();
}

// Routes middleware should run on
export const config = {
    matcher: ['/post/:path*', '/review/:path*']
}