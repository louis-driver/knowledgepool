import { NextResponse, NextRequest } from 'next/server';
import { executeStatement } from '../../util/executeStatement';

// Define and export the GET handler function
export async function GET(request: NextRequest) {

    try {
        // Create query to fetch the oldest posts that have not received three reviews thus far.
        // TODO only return posts that aren't written by the user 
        let get_post_query = "select * from post where post.post_id IN (SELECT review.post_id from review GROUP BY review.post_id HAVING COUNT(review.post_id) < 3) ORDER BY post.create_time LIMIT 3;";

        // Execute the query and retrieve results
        const sqlResponse = await executeStatement({}, get_post_query);
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