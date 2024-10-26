import { NextResponse, NextRequest } from 'next/server';
import { handleRouteGET } from '../../util/handleRouteGET';

// Define and export the GET handler function
export async function GET(request: NextRequest, {params}: {params: Promise<{category_id: string}>}) {

    // Get category to filter by from url parameter
    const category_id = (await params).category_id;

    // Query to fetch post title and summary data for card display
    let get_post_query = "SELECT user.username, post.title, post.summary FROM user INNER JOIN post ON user.user_id=post.user_id INNER JOIN post_category_bridge ON post.post_id=post_category_bridge.post_id WHERE post_category_bridge.category_id=?";

    // Array to pass parameters to SQL query
    let values: any[] = [category_id];

    // Return NextResponse of query values in json format
    return await handleRouteGET(request, values, get_post_query);
}