import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings, IDBSettings } from '../../../../types/db_settings';

// Populate mysql database parameters
let connectionParams = GetDBSettings();

// Define and export the GET handler function
export async function GET(request: NextRequest) {

    try {
        //const post_id = (await params).post_id;
        
        // Connect to database
        const connection = await mysql.createConnection(connectionParams);

        // Create query to fetch post title and summary data for card display
        let get_review_query = "SELECT review.review_id, review.approval_rating, review.comments from review";

        //let values: any[] = [post_id];

        // Execute the query and retrieve results
        const [results] = await connection.execute(get_review_query);

        // Return results as a JSON object
        return NextResponse.json(results)
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message)

        const response = {
            error: (err as Error).message,
            returnedStatus: 200,
        }

        return NextResponse.json(response, {status: 200})
    }
}