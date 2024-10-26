/* Resource: https://www.wisp.blog/blog/nextjs-14-app-router-get-and-post-examples-with-typescript */

import { executeStatement } from '../../../util/executeStatement';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    console.log("Begin POST request");
    const body = await request.json();
    console.log("POST body:", body);

    const insertStatement = "INSERT INTO `knowledgepool`.`post` (user_id, response_to, version_of, version, title, summary, content) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // TODO verify that user_id is the same as the author of the post
    // TODO get version_of and version from form or dynamic route
    const validatedValues = body;

    // Execute insert statement with the given values
    const sqlResponse = await executeStatement(validatedValues, insertStatement);
    const responseValues = await sqlResponse.json();

    // TODO conditionally check if post would be created
    const creationStatus = true;

    const response = {
        message: "We received your post update, thank you! It will be reviewed in our filtration system!",
        received: body,
        sqlResponse: responseValues,
        status: creationStatus
    }
    return NextResponse.json(response);
}