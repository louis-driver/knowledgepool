import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings, IDBSettings } from '../../../types/db_settings';

// Populate mysql database parameters
let connectionParams = GetDBSettings();

// Define and export the GET handler function
export async function handleRouteGET(request: NextRequest, params: any[], query: string) {

    try {
        // Connect to database
        const connection = await mysql.createConnection(connectionParams);

        // Execute the query and retrieve results
        const [results] = await connection.execute(query, params);

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