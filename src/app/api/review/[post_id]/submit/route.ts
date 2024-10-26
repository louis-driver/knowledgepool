import { NextRequest, NextResponse } from 'next/server';
import { executeStatement } from '../../../util/executeStatement';

export async function POST(request: NextRequest) {
    console.log("Begin POST request /review/submit");
    const body = await request.json();
    console.log("POST body:", body);

    const insertStatement = "INSERT INTO `knowledgepool`.`review` (post_id, user_id, approval_rating, comments) VALUES (?, ?, ?, ?)";

    // TODO validate and process submissions
    // TODO get post_id from dynamic route or form data
    // TODO verify approval is one of the correct enum values
    // TODO check comments length
    const validatedValues = body;

    // Execute insert statement with the given values
    const sqlResponse = await executeStatement(validatedValues, insertStatement);
    const responseValues = await sqlResponse.json();

    // TODO conditionally check if post would be created
    const creationStatus = true;

    const response = {
        message: "Thanks for signing up! We will verify your account creation shortly.",
        received: body,
        sqlResponse: responseValues,
        status: creationStatus
    }
    return NextResponse.json(response);
}