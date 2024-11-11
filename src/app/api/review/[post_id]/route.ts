import { NextResponse, NextRequest } from 'next/server';
import { executeStatement } from '../../util/executeStatement';

// Define and export the GET handler function
export async function GET(request: NextRequest, {params}: {params: Promise<{post_id: string}>}) {

    try {
        // Get post_id filter by from url parameter
        const post_id = (await params).post_id;

        // Create query to fetch the oldest posts that have not received three reviews thus far.
        // TODO only return posts that aren't written by the user 
        let get_post_query = "SELECT * FROM post WHERE post_id=?";

        // Execute the query and retrieve results
        const sqlResponse = await executeStatement({post_id}, get_post_query);
        const responseValues = await sqlResponse.json();
        console.log(responseValues);

        // Return results as a JSON object
        return NextResponse.json(responseValues)
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message)

        const response = {
            error: (err as Error).message,
            returnedStatus: 200,
        }

        return NextResponse.json(response, {status: 200})
    }
}