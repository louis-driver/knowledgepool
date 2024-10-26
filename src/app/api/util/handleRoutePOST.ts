/* Resource: https://www.wisp.blog/blog/nextjs-14-app-router-get-and-post-examples-with-typescript */

import { NextRequest, NextResponse } from 'next/server';

export async function handleRoutePOST(request: NextRequest, responseMessage: string) {
    console.log("Begin POST request");
    const body = await request.json();
    console.log("POST body:", body);

    // TODO validate and process submissions
    
    const response = {
        message: responseMessage,
        received: body
    }
    return NextResponse.json(response);
}