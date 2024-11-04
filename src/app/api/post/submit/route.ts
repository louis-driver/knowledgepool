import { NextRequest, NextResponse } from 'next/server';
import { executeStatement } from '../../util/executeStatement';
import { getSession } from '@/app/lib/session';

export async function POST(request: NextRequest) {
    console.log("Begin POST request submit post");
    const body = await request.json();
    console.log("Submitted body:", body);

    const insertStatement = "INSERT INTO `knowledgepool`.`post` (user_id, response_to, version_of, version, title, summary, content) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Get user_id from cookie
    const session = await getSession();
    const userId = session?.userId[0].user_id; // TODO define types

    // TODO add ability to respond to other posts
    const responseTo = null;

    // TODO add ability to edit posts
    const versionOf = null;

    // TODO calculate version based on if a post is edited
    const version = 1;

    // TODO add functionality to create form with dynamic number of fields, rather than one content field
    const content = {
        text: body.content,
        resources: body.resources
    }

    // TODO validate field lengths for title and summary
    const validatedValues = {
        user_id: userId,
        response_to: responseTo,
        version_of: versionOf,
        version: version,
        title: body.title,
        summary: body.summary,
        content: content
    }

    // Execute insert statement with the given values
    const sqlResponse = await executeStatement(validatedValues, insertStatement);
    const responseValues = await sqlResponse.json();

    // TODO conditionally check if post would be created
    const creationStatus = true;

    const response = {
        message: "We received your post, thank you! It will be reviewed in our filtration system!",
        received: body,
        status: creationStatus
    }
    return NextResponse.json(response);
}