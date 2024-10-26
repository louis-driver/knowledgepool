import { NextResponse, NextRequest } from 'next/server';
import { handleRouteGET } from '@/app/api/util/handleRouteGET';

// Define and export the GET handler function
export async function GET(request: NextRequest, {params}: {params: Promise<{user_id: string}>}) {

    // Get category to filter by from url parameter
    const user_id = (await params).user_id;

    // Create query to fetch post title and summary data for card display
    let get_post_query = "SELECT user.username, post.title, post.summary FROM user INNER JOIN post ON user.user_id=post.user_id WHERE user.user_id=?";

    // Array to pass parameters to SQL query
    let values: any[] = [user_id];

    // Return results as a JSON object
    return await handleRouteGET(request, values, get_post_query);
}