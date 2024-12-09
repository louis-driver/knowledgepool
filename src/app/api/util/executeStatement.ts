import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings, ReturnError } from '../../../types/db_settings';

// Populate mysql database parameters
let connectionParams = GetDBSettings();

// Define and export the executeStatement function
export async function executeStatement(params: any, sqlStatement: string) {

    try {
        // Connect to database
        const connection = await mysql.createConnection(connectionParams);

        console.log("SQL Statement:", sqlStatement);

        const values = Object.values(params);
        console.log("Values as array:", values);

        // Execute the query and retrieve results
        const [results] = await connection.execute(sqlStatement, values);

        await connection.end()

        // Return results as a JSON object
        return NextResponse.json(results)
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message)

        const response: ReturnError = {
            error: (err as Error).message,
            returnedStatus: 200,
        }

        return NextResponse.json(response, {status: 200})
    }
}