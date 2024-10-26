import { NextResponse, NextRequest } from 'next/server';
import { handleRouteGET } from '../util/handleRouteGET';

// Define and export the GET handler function
export async function GET(request: NextRequest) {
    // Create query to fetch post title and summary data for card display
    let get_post_query = "SELECT user.username, post.title, post.summary FROM user INNER JOIN post ON user.user_id=post.user_id";
    // Return results as a JSON object
    return await handleRouteGET(request, [], get_post_query);
}

/* Resource: https://stackoverflow.com/questions/76446399/nextjs-app-directory-how-to-pass-middleware-data-into-a-page-tsx */