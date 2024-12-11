import { PostCardForDisplay, PostForDisplay, PostFormSubmission, PostSubmission } from "@/types/post";
import { executeStatement } from "../api/util/executeStatement";
import { getSession } from "../lib/session";
import { Review } from "@/types/review";
import { FormResponse, isAuthorOf } from "./auth";
import { ErrorMessage } from "@/types/errors";

export async function getPosts() {
    console.log("getPosts called");
    try {
        // Create query to fetch post title and summary data for card display from posts that have 2 or more approved ratings
        let get_posts_query = "SELECT post.post_id, user.username, post.title, post.summary FROM user INNER JOIN post ON user.user_id = post.user_id LEFT JOIN review ON post.post_id = review.post_id AND review.approval_rating = 'Approved' GROUP BY post.post_id HAVING COUNT(review.review_id) >= 2 ORDER BY post.create_time DESC;";

        // Execute the query and retrieve results
        const sqlResponse = await executeStatement({}, get_posts_query);
        const responseValues: PostCardForDisplay[] = await sqlResponse.json();

        // Return results as a JSON object
        return responseValues;
    } catch (err) {
        console.log('ERROR: DATABASE - ', (err as Error).message)
        const response: ErrorMessage = {
            error: (err as Error).message,
            returnedStatus: 500,
        }
        return response;
    }
}

export async function getPost(post_id: number) {
    console.log("getPost called, post_id:", post_id);
    try {
        // Create query to fetch post
        let get_post_query = "SELECT post.post_id, user.username, post.response_to, post.title, post.summary, post.content, post.create_time FROM user INNER JOIN post ON user.user_id=post.user_id WHERE post.post_id = ?";

        // Execute the query and retrieve results
        const sqlResponse = await executeStatement({post_id}, get_post_query);
        const responseValues: PostForDisplay[] = await sqlResponse.json();

        if (responseValues.length === 0) {
            const response: ErrorMessage = {
                error: `No post found with id ${post_id}`,
                returnedStatus: 404,
            }
            return response;
        }

        // Return post as a JSON object
        return responseValues[0];
    } catch (err) {
        console.log('ERROR: DATABASE - ', (err as Error).message)
        const response: ErrorMessage = {
            error: (err as Error).message,
            returnedStatus: 500,
        }
        return response;
    }
}

export async function getReviewsForPost(post_id: number) {
    console.log("getReviewsForPost called, post_id:", post_id);
    try {
        // Verify the user requesting the reviews is the author of the post
        let isAuthor = await isAuthorOf(post_id)

        // Return an error if not the author
        if (!isAuthor) {
            const response: ErrorMessage = {
                error: "User is not authorized to view reviews for this post.",
                returnedStatus: 401
            }
            return response;
        }

        // Create query to fetch the reviews for a given post
        let get_reviews_query = "SELECT * FROM review WHERE post_id=?";

        // Execute the query and retrieve results
        const getReviewsResponse = await executeStatement({post_id}, get_reviews_query);
        const responseValues: Review[] = await getReviewsResponse.json();

        // Return results as a JSON object
        return responseValues;
    } catch (err) {
        console.log('ERROR: DATABASE - ', (err as Error).message)

        const response: ErrorMessage = {
            error: (err as Error).message,
            returnedStatus: 500,
        }

        return response;
    }
}

export async function getReviewedPosts(user_id: number) {
    console.log("getReviewedPosts called, user_id:", user_id);
    try {
        // Create query to fetch all posts a user has submitted for review
        let get_reviewed_posts_query = "SELECT * FROM post WHERE user_id=?";

        // Execute the query and retrieve results
        const sqlResponse = await executeStatement({user_id}, get_reviewed_posts_query);
        const responseValues = await sqlResponse.json();

        // Return results as a JSON object
        return responseValues;
    } catch (err) {
        console.log('ERROR: DATABASE - ', (err as Error).message)

        const response: ErrorMessage = {
            error: (err as Error).message,
            returnedStatus: 500,
        }

        return response;
    }
}

export async function submitPost(post: PostFormSubmission) {
    console.log("called submitPost");
    console.log("Submitted:", post);

    // Get user_id from session cookie
    const session = await getSession();
    console.log("Session:", session);
    console.log("user_id:", session?.user_id);

    const insertStatement = "INSERT INTO `knowledgepool`.`post` (user_id, response_to, version_of, version, title, summary, content) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // TODO add ability to respond to other posts
    const responseTo = null;

    // TODO add ability to edit posts
    const versionOf = null;

    // TODO calculate version based on if a post is edited
    const version = 1;

    // TODO add functionality to create form with dynamic number of fields, rather than one content field
    const content = {
        text: post.content,
        resources: post.resources
    }

    // TODO validate field lengths for title and summary
    const validatedValues: PostSubmission = {
        user_id: session?.user_id,
        response_to: responseTo,
        version_of: versionOf,
        version: version,
        title: post.title,
        summary: post.summary,
        content: content
    }

    // Execute insert statement with the given values
    await executeStatement(validatedValues, insertStatement);
  
    // TODO conditionally check if post would be created
    const creationStatus = true;

    const response: FormResponse = {
        message: "We received your post, thank you! It will be reviewed in our filtration system!",
        creationStatus: creationStatus
    }
    return response;
}