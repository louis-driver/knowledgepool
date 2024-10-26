/* Resource: https://www.wisp.blog/blog/nextjs-14-app-router-get-and-post-examples-with-typescript */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    console.log("Begin POST to unfollow");
    const body = await request.json();
    console.log("POST body:", body);

    // TODO validate and process submissions
    
    const response = {
        message: "You have successfully unfollowed",
        received: body
    }
    return NextResponse.json(response);
}