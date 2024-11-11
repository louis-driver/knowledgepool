import { NextRequest, NextResponse } from 'next/server';
import { executeStatement } from '../../util/executeStatement';

export async function POST(request: NextRequest) {
    console.log("Begin POST request /review/submit");
    const body = await request.json();
    console.log("POST body:", body);

    const insertStatement = "INSERT INTO `knowledgepool`.`review` (post_id, user_id, approval_rating, comments) VALUES (?, ?, ?, ?)";

    // TODO validate and process submissions

    // Check if the user has submitted a review for this post
    const hasReviewedStatement = "SELECT * FROM review WHERE post_id = ? AND user_id = ?;"
    const hasReviewedValues ={
        post_id: body.post_id,
        user_id: body.user_id
    }
    const hasReviewedResponse = await executeStatement(hasReviewedValues, hasReviewedStatement);
    const hasReviewed = await hasReviewedResponse.json();
    console.log("hasReviewed:", hasReviewed);
    // If there is a review for the post by the user return early
    if (hasReviewed.length != 0) {
        console.log("Reviewer has reviewed before")
        return NextResponse.json({message: "You have already submitted a review for this post."})
    }
    // TODO verify approval is one of the correct enum values
    
    // Values for SQL statement parameters
    const validatedValues = {
        post_id: body.post_id,
        user_id: body.user_id,
        approval_rating: body.rating,
        comments: body.review
    };

    // Execute insert statement with the given values
    await executeStatement(validatedValues, insertStatement);

    const response = {
        message: "Thanks for keeping our water clean!",
        received: body,
    }
    return NextResponse.json(response);
}