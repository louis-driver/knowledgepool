import { PostFormSubmission, PostSubmission } from "@/types/post";
import { executeStatement } from "../api/util/executeStatement";
import { getSession } from "../lib/session";

export async function getPosts() {
    console.log("getPosts called");
    try {
        // Create query to fetch post title and summary data for card display
        let get_posts_query = "SELECT post.post_id, user.username, post.title, post.summary FROM user INNER JOIN post ON user.user_id=post.user_id";

        // Execute the query and retrieve results
        const sqlResponse = await executeStatement({}, get_posts_query);
        const responseValues = await sqlResponse.json();

        // Return results as a JSON object
        return responseValues;
    } catch (err) {
        console.log('ERROR: DATABASE - ', (err as Error).message)
        const response = {
            error: (err as Error).message,
            returnedStatus: 200,
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
        const responseValues = await sqlResponse.json();

        // Return post as a JSON object
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

export async function getReviewsForPost(post_id: number) {
    console.log("getReviewsForPost called, post_id:", post_id);
    try {
        // TODO check that the author is requesting the reviews

        // Create query to fetch the reviews for a given post
        let get_reviews_query = "SELECT * FROM review WHERE post_id=?";

        // Execute the query and retrieve results
        const sqlResponse = await executeStatement({post_id}, get_reviews_query);
        const responseValues = await sqlResponse.json();

        // Return results as a JSON object
        return responseValues;
    } catch (err) {
        console.log('ERROR: DATABASE - ', (err as Error).message)

        const response = {
            error: (err as Error).message,
            returnedStatus: 200,
        }

        return response;
    }
}

export async function getReviewedPosts(user_id: number) {
    console.log("getReviewedPosts called, user_id:", user_id);
    try {
        // TODO check that the author is requesting the reviews

        // Create query to fetch all posts a user has submitted for review
        let get_reviewed_posts_query = "SELECT * FROM post WHERE user_id=?";

        // Execute the query and retrieve results
        const sqlResponse = await executeStatement({user_id}, get_reviewed_posts_query);
        const responseValues = await sqlResponse.json();

        // Return results as a JSON object
        return responseValues;
    } catch (err) {
        console.log('ERROR: DATABASE - ', (err as Error).message)

        const response = {
            error: (err as Error).message,
            returnedStatus: 200,
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

    const response = {
        message: "We received your post, thank you! It will be reviewed in our filtration system!",
        received: post,
        creationStatus: creationStatus
    }
    return response;
}