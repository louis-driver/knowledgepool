import { createSession, getSession } from "@/app/lib/session";
import { FormState, SignupFormSchema } from "@/app/lib/signup";
import { executeStatement } from "../api/util/executeStatement";
import { compare, hash } from "bcrypt";
import { Credentials } from "@/types/user";
import { SignupForm } from "@/types/forms";
import { isReturnError } from "@/types/db_settings";
import { ErrorMessage } from "@/types/errors";

export interface FormResponse {
    message: string,
    creationStatus: boolean
    errors?: {
        username?: string[] | undefined;
        email?: string[] | undefined;
        password?: string[] | undefined;
        firstname?: string[] | undefined;
        lastname?: string[] | undefined;
    }
}

export async function createUser(body: SignupForm) {
    console.log("createUser called.");
    console.log("Received:", body);

    try {
        // Query database to determine if an account exists for the provided username or email
        const findExistingStatement = "SELECT * FROM user WHERE username = ? OR email = ?";
        const proposedIds = {
            username: body.username, 
            email: body.email
        };
        const findExisistingResponse = await executeStatement(proposedIds, findExistingStatement);
        const findExisisting = await findExisistingResponse.json();

        // Return error if one occurs during statement execution
        if (isReturnError(findExisisting)) {
            const serverErrorMessage: FormResponse = {
                message: "Could not connect to database to create account.",
                creationStatus: false
            }
            return serverErrorMessage;
        }

        // If an account exists with those values, return message
        if (findExisisting.length != 0) {
            const accountExistsMessage: FormResponse = {
                message: "An account already exists for that username or email. Choose a new username or email.",
                creationStatus: false
            }
            return accountExistsMessage;
        }

        const insertStatement = "INSERT INTO user (username, email, password, firstname, lastname) VALUES (?, ?, ?, ?, ?)";

        // Hash the password for storage in database
        const hashedPassword = await hash(body.password, 10)
        const validatedValues = SignupFormSchema.safeParse({
            username: body.username,
            email: body.email,
            password: hashedPassword,
            firstname: body.firstname,
            lastname: body.lastname
        });

        //If any form fields are invalid return early
        if (!validatedValues.success) {
            console.log("Fields not validated");
            console.log(validatedValues);
            const validationErrorMessage: FormResponse = {
                message: "Could not create your account due to formatting errors.",
                creationStatus: false,
                errors: validatedValues.error.flatten().fieldErrors
            }
            return validationErrorMessage
        }

        // Execute insert statement with validated values to create user account
        await executeStatement(validatedValues.data, insertStatement);

        // Get user_id from database for newly created user for use in session cookie
        const findUserIdResponse = await executeStatement({username: validatedValues.data.username}, "SELECT user_id FROM `knowledgepool`.`user` WHERE username = ?");
        const userIdReponse = await findUserIdResponse.json();
        const user_id = userIdReponse[0].user_id;
        
        // Create the session cookie
        console.log("Creating session for user_id", user_id);
        await createSession(user_id);

        const response: FormResponse = {
            message: "Thanks for signing up! We will verify your account creation shortly.",
            creationStatus: true
        }
        return response;
    } catch (error) {
        console.log("Error occurred while creating user:", error)
        const errorResponse: FormResponse = {
            message: "An unexpected error occurred",
            creationStatus: false
        }
        return errorResponse;
    }
}

export async function authenticateUser(credentials: Credentials) {
    console.log("authenticateUser called");
    console.log("Received:", credentials);

    try {
        // Write query to find user and compare password hash
        const selectStatement = "SELECT username, password FROM user WHERE username = ?";

        // Execute statement to get username and password for comparison
        const sqlResponse = await executeStatement({username: credentials.username}, selectStatement);
        const responseValues = await sqlResponse.json();

        // If no values are returned the username doesn't exist
        if (responseValues.length == 0) {
            return {
                message: "An account for that username does not exist.",
                authenticated: false
            }
        }

        // Compare provided password and stored password
        const authenticated = await compare(credentials.password, responseValues[0].password);
        console.log("Passwords Match:", authenticated);

        // Check that the provided passwords match to access resources
        if (!authenticated) {
            // Return early if not authenticated
            return {
                message: "We are unable to authenticate your request.", 
                authenticated: authenticated
            };
        }

        // Get user_id from database for use in session cookie
        const findUserIdResponse = await executeStatement({username: credentials.username}, "SELECT user_id FROM user WHERE username = ?");
        const userIdReponse = await findUserIdResponse.json();
        const user_id = userIdReponse[0].user_id;

        // Create the session cookie
        console.log("Creating session for user_id", user_id);
        await createSession(user_id);

        return {
            message: "You're all signed in!",
            authenticated: authenticated
        };
    } catch (error) {
        console.log("Error occurred during authentication:", error)
        return error;
    }
}

// Function to verify if the provided user_id for a request is the same as their session cookie
export async function isUser(user_id: number) {
    try {
        console.log("isUser received user_id", user_id);
        const session = await getSession();
        const sessionUser_id = session?.user_id;
        console.log("user_id from session cookie", sessionUser_id);
        
        if (user_id === sessionUser_id)
            return true;
        else
            return false;
    } catch (error) {
        console.log("An error occurred while verifying user with id", user_id);
        console.log(error)

        // Return false because we cannot validate the user
        return false;
    }
}

// Function to verify if the user_id of the session is the author of the post with the provided post_id
export async function isAuthorOf(post_id: number) {
    try {
        // Query to get user_id of the post
        const get_author_query = "SELECT user_id FROM post WHERE post_id=?"
        const getAuthorResponse = await executeStatement({post_id}, get_author_query);
        const authorValues = await getAuthorResponse.json();
        
        // If sql response is empty, no post exists
        if (authorValues.length == 0 ) {
            let response: ErrorMessage = {
                error: `There is no post with the requested id of ${post_id}`,
                returnedStatus: 404
            }
            return response; 
        }
        
        // Otherwise, continue by getting the user_id
        let user_id = authorValues[0].user_id;

        // Verify the user requesting the reviews is the author of the post
        let isAuthor = await isUser(user_id)

        return isAuthor;
    } catch (error) {
        console.log("An error occurred while verifying author for post with id", post_id);
        console.log(error)

        let response: ErrorMessage = {
            error: "Internal server error",
            returnedStatus: 500
        }

        return response;
    }
}

export async function hasReviewedPost(post_id: number) {
    try {
        // Query to get user_id of the post
        const get_reviewers_query = "SELECT user_id FROM review WHERE post_id=?"
        const getReviewersResponse = await executeStatement({post_id}, get_reviewers_query);
        const reviewerValues = await getReviewersResponse.json();
        console.log("Reviewers:", reviewerValues)

        // If post has no reviews, user has not reviewed the post
        if (reviewerValues.length === 0) {
            return false;
        }

        // Get user id from session cookie
        const session = await getSession();
        const sessionUser_id = session?.user_id;
        
        let hasReviewed = false
        reviewerValues.map((value) => {
            if (value.user_id === sessionUser_id)
                hasReviewed = true
        }) 

        return hasReviewed;
    } catch (error) {
        console.log("An error occurred while verifying author for post with id", post_id);
        console.log(error)

        let response: ErrorMessage = {
            error: "Internal server error",
            returnedStatus: 500
        }

        return response;
    }
}