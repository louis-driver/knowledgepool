import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";

export default async function middleware(req: NextRequest) {
    // Decrypt session from the cookie
    const session = await getSession();
    console.log("Session:", session)

    // Redirect to login if the user is not authenticated 
    if (!session) {
        return NextResponse.redirect(new URL('/user/signin', req.nextUrl));
    }

    return NextResponse.next();
}

// Routes middleware should run on
export const config = {
    matcher: ['/post/:path*', '/review/:path*']
}