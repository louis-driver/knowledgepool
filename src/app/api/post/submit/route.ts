import { NextRequest, NextResponse } from 'next/server';
import { executeStatement } from '../../util/executeStatement';

export async function POST(request: NextRequest) {
    console.log("Begin POST request submit post");
    const body = await request.json();
    console.log("POST body:", body);

    const insertStatement = "INSERT INTO `knowledgepool`.`post` (user_id, response_to, version_of, version, title, summary, content) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // TODO validate and process submissions
    const validatedValues = body;

    // Execute insert statement with the given values
    const sqlResponse = await executeStatement(validatedValues, insertStatement);
    const responseValues = await sqlResponse.json();

    // TODO conditionally check if post would be created
    const creationStatus = true;

    const response = {
        message: "We received your post, thank you! It will be reviewed in our filtration system!",
        received: body,
        sqlResponse: responseValues,
        status: creationStatus
    }
    return NextResponse.json(response);
}