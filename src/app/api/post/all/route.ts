import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings, IDBSettings } from '../../../../types/db_settings';

// Populate mysql database parameters
let connectionParams = GetDBSettings();

// Define and export the GET handler function
export async function GET(request: NextRequest) {

    try {
        // Connect to database
        const connection = await mysql.createConnection(connectionParams);

        // Create query to fetch post title and summary data for card display
        let get_post_query = "SELECT user.username, post.title, post.summary FROM user INNER JOIN post ON user.user_id=post.user_id";

        // Execute the query and retrieve results
        const [results] = await connection.execute(get_post_query);

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

/* Resource: https://stackoverflow.com/questions/76446399/nextjs-app-directory-how-to-pass-middleware-data-into-a-page-tsx */