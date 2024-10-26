import { NextResponse, NextRequest } from 'next/server';
import { handleRouteGET } from '../../util/handleRouteGET';

// Define and export the GET handler function
export async function GET(request: NextRequest, {params}: {params: Promise<{post_id: string}>}) {

    // Get post_id to filter by from url parameter
    const post_id = (await params).post_id;
    
    // Create query to fetch review data
    let get_review_query = "SELECT review.review_id, review.approval_rating, review.comments from review WHERE review.post_id=?";

    // Pass query parameters into an array
    let values: any[] = [post_id];

    // Return NextResponse of query values in json format
    return await handleRouteGET(request, values, get_review_query);
}