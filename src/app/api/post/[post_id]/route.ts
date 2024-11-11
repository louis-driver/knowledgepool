import { NextResponse, NextRequest } from 'next/server';
import { handleRouteGET } from '../../util/handleRouteGET';

// Define and export the GET handler function
export async function GET(request: NextRequest, {params}: {params: Promise<{post_id: string}>}) {

    // Get post_id  from url parameter
    const post_id = (await params).post_id;

    // Query to fetch post information to create a page
    let get_post_query = "SELECT post.post_id, user.username, post.response_to, post.title, post.summary, post.content, post.create_time FROM user INNER JOIN post ON user.user_id=post.user_id WHERE post.post_id=?";

    // Array to pass parameters to SQL query
    let values: any[] = [post_id];

    // Return NextResponse of query values in json format
    return await handleRouteGET(request, values, get_post_query);
}