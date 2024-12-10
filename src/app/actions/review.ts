import { executeStatement } from "../api/util/executeStatement";
import { PostForReview, Review, ReviewSubmission } from "@/types/review";
import { getSession } from "../lib/session";
import { hasReviewedPost, isAuthorOf } from "./auth";
import { ErrorMessage, isErrorMessage } from "@/types/errors";

export async function getPostForReview(post_id: number) {
    try {
        // Verify the user requesting the reviews is the author of the post
        let isAuthor = await isAuthorOf(post_id)
        console.log("isAuthor:", isAuthor)

        if (isErrorMessage(isAuthor)) {
            return isAuthor;
        }
        // Return an error if requesting user is the author, as they wrote the post
        else if (isAuthor) {
            const response: ErrorMessage = {
                error: "Authors are not authorized to review their own posts.",
                returnedStatus: 401
            }
            return response;
        }

        let hasReviewed = await hasReviewedPost(post_id)
        if (hasReviewed) {
            const response: ErrorMessage = {
                error: `User has already reviewed post with id ${post_id}`,
                returnedStatus: 401,
            }
            return response; 
        }

        // Create query to fetch the selected post to review
        let get_post_query = "SELECT * FROM post WHERE post_id=?";

        // Execute the query and retrieve results
        const sqlResponse = await executeStatement({post_id}, get_post_query);
        const responseValues: PostForReview[] = await sqlResponse.json();
        console.log(responseValues);

        // Return error if no posts are returned
        if (responseValues.length === 0) {
            const response: ErrorMessage = {
                error: `No post found with id ${post_id}`,
                returnedStatus: 404,
            }
            return response;
        }

        // Return first result in array as a JSON object, as there is only one record returned for a given post_id
        return responseValues[0];
    } catch (err) {
        console.log('ERROR: DATABASE - ', (err as Error).message)

        const response = {
            error: (err as Error).message,
            returnedStatus: 500,
        }

        return response;
    }
}

export async function getPostsForReview() {
    try {
        // Create query to fetch the oldest posts that have not received three reviews thus far, are not written by the current user, and have not been reviewed by the current users.
        // TODO Post Versioning: only return the most recent version.
        let get_post_query = "SELECT p.* FROM post p LEFT JOIN review r ON p.post_id = r.post_id WHERE p.user_id != ? AND NOT EXISTS (SELECT 1 FROM review r2 WHERE r2.post_id = p.post_id AND r2.user_id = ?) GROUP BY p.post_id HAVING COUNT(r.review_id) < 3 LIMIT 3;";

        const session = await getSession();
        const user_id = session?.user_id;
        // Execute the query and retrieve results
        const sqlResponse = await executeStatement({user_id: user_id, user_id2: user_id}, get_post_query);
        const responseValues: PostForReview[] = await sqlResponse.json();
        console.log(responseValues);

        // Return results as a JSON object
        return responseValues
    } catch (err) {
        console.log('ERROR: DATABASE - ', (err as Error).message)

        const response = {
            error: (err as Error).message,
            returnedStatus: 500,
        }

        return response;
    }
}

export async function submitReview(review: ReviewSubmission) {
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
        approval_rating: review.approval_rating,
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

export async function getApprovalRatings(post_id: number) {
    try {
        const selectRatingsStatement = "SELECT review_id, approval_rating FROM review WHERE post_id = ?;"
        const ratingsResponse = await executeStatement({post_id: post_id}, selectRatingsStatement);
        const ratings = await ratingsResponse.json();
        console.log(ratings);
        return ratings;
    } catch (err) {
        console.log('ERROR: DATABASE - ', (err as Error).message)
        const response = {
            error: (err as Error).message,
            returnedStatus: 500,
        }
        return response;
    }
}