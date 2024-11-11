import { executeStatement } from "../api/util/executeStatement";
import { Review } from "@/types/review";

export async function getPostForReview(post_id: number) {
    try {
        // Create query to fetch the oldest posts that have not received three reviews thus far.
        // TODO only return posts that aren't written by the user 
        let get_post_query = "SELECT * FROM post WHERE post_id=?";

        // Execute the query and retrieve results
        const sqlResponse = await executeStatement({post_id}, get_post_query);
        const responseValues = await sqlResponse.json();
        console.log(responseValues);

        // Return first result in array as a JSON object
        return responseValues[0];
    } catch (err) {
        console.log('ERROR: DATABASE - ', (err as Error).message)

        const response = {
            error: (err as Error).message,
            returnedStatus: 200,
        }

        return response;
    }
}

export async function getPostsForReview() {
    try {
        // Create query to fetch the oldest posts that have not received three reviews thus far.
        // TODO only return posts that aren't written by the user 
        let get_post_query = "select * from post where post.post_id IN (SELECT review.post_id from review GROUP BY review.post_id HAVING COUNT(review.post_id) < 3) ORDER BY post.create_time LIMIT 3;";

        // Execute the query and retrieve results
        const sqlResponse = await executeStatement({}, get_post_query);
        const responseValues = await sqlResponse.json();
        console.log(responseValues);

        // Return results as a JSON object
        return responseValues
    } catch (err) {
        console.log('ERROR: DATABASE - ', (err as Error).message)

        const response = {
            error: (err as Error).message,
            returnedStatus: 200,
        }

        return response;
    }
}

export async function submitReview(review: Review) {
    console.log("Called submitReview");
    console.log("Received:", review);

    const insertStatement = "INSERT INTO `knowledgepool`.`review` (post_id, user_id, approval_rating, comments) VALUES (?, ?, ?, ?)";

    // TODO validate and process submissions

    // Check if the user has submitted a review for this post
    const hasReviewedStatement = "SELECT * FROM review WHERE post_id = ? AND user_id = ?;"
    const hasReviewedValues ={
        post_id: review.post_id,
        user_id: review.user_id
    }
    const hasReviewedResponse = await executeStatement(hasReviewedValues, hasReviewedStatement);
    const hasReviewed = await hasReviewedResponse.json();
    // If there is a review for the post by the user return early
    if (hasReviewed.length != 0) {
        console.log("Reviewer has reviewed before")
        return {message: "You have already submitted a review for this post."}
    }
    // TODO verify approval is one of the correct enum values
    
    // Values for SQL statement parameters
    const validatedValues = {
        post_id: review.post_id,
        user_id: review.user_id,
        approval_rating: review.rating,
        comments: review.comments
    };

    // Execute insert statement with the given values
    await executeStatement(validatedValues, insertStatement);

    const response = {
        message: "Thanks for keeping our water clean!",
        received: review,
    }
    return response;
}