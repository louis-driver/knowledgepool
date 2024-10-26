import { NextResponse, NextRequest } from 'next/server';
import { handleRouteGET } from '../../util/handleRouteGET';

// Define and export the GET handler function
export async function GET(request: NextRequest, {params}: {params: Promise<{ids: string[]}>}) {
    // Get category and user to filter by from url parameter
    const user_id = (await params).ids[0];
    const category_id = (await params).ids[1];
    
    // Create query to fetch post title and summary data for card display
    let get_post_query = "SELECT user.username, post.title, post.summary FROM user INNER JOIN post ON user.user_id=post.user_id INNER JOIN post_category_bridge ON post.post_id=post_category_bridge.post_id WHERE user.user_id=? AND post_category_bridge.category_id=?;";

    // Array to pass parameters to SQL query
    let values: any[] = [user_id, category_id];

    return await handleRouteGET(request, values, get_post_query);
}