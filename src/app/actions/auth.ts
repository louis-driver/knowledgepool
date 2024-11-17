import { createSession } from "@/app/lib/session";
import { FormState, SignupFormSchema } from "@/app/lib/signup";
import { executeStatement } from "../api/util/executeStatement";
import { compare, hash } from "bcrypt";
import { Credentials } from "@/types/user";
import { SignupForm } from "@/types/forms";

export async function createUser(body: SignupForm) {
    console.log("createUser called.");
    console.log("Received:", body);

    // Query database to determine if an account exists for the provided username or email
    const findExistingStatement = "SELECT * FROM user WHERE username = ? OR email = ?";
    const proposedIds = {
        username: body.username, 
        email: body.email
    };
    const findExisistingResponse = await executeStatement(proposedIds, findExistingStatement);
    const findExisisting = await findExisistingResponse.json();

    // If an account exists with those values, return message
    if (findExisisting.length != 0) {
        const accountExistsMessage = {
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
        return {
            errors: validatedValues.error.flatten().fieldErrors,
            creationStatus: false
        }
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

    const response = {
        message: "Thanks for signing up! We will verify your account creation shortly.",
        received: body,
        creationStatus: true
    }
    return response;
}

export async function authenticateUser(credentials: Credentials) {
    console.log("authenticateUser called");
    console.log("Received:", credentials);

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
}