import { NextRequest, NextResponse } from 'next/server';
import { executeStatement } from '../../../util/executeStatement';

export async function PUT(request: NextRequest) {
    console.log("Begin POST request /user/delete");
    const body = await request.json();
    console.log("POST body:", body);

    // Anonymize user and remove personal information from account
    const updateStatement = "UPDATE `knowledgepool`.`user` SET username='anonymous', email='deleted', password='deleted', firstname='Anonymous', lastname='User', create_time=CURRENT_TIMESTAMP() WHERE user_id=?";

    // TODO validate and process submission
    const validatedValues = body;

    // Execute update statement for the given user_id
    const sqlResponse = await executeStatement(validatedValues, updateStatement);
    const responseValues = await sqlResponse.json();

    // TODO check if user is deleted
    const deletionStatus = true;

    const response = {
        message: "We're sorry to see you go. Your personal information will be deleted and your posts will be anonymized.",
        received: body,
        sqlResponse: responseValues,
        deleted: deletionStatus
    }
    return NextResponse.json(response);
}