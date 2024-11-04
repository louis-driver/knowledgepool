import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { executeStatement } from '../../util/executeStatement';
import { createSession } from '@/app/lib/session';
import { SignupFormSchema } from '@/app/lib/signup';
import { redirect } from 'next/navigation';

export async function POST(request: NextRequest) {
    console.log("Begin POST request submit user");
    const body = await request.json();
    console.log("POST body:", body);

    // Query database to determine if an account exists for the provided username or email
    const findExistingStatement = "SELECT * FROM `knowledgepool`.`user` WHERE user.username = ? OR user.email = ?";
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
        return NextResponse.json(accountExistsMessage);
    }

    const insertStatement = "INSERT INTO `knowledgepool`.`user` (username, email, password, firstname, lastname) VALUES (?, ?, ?, ?, ?)";

    // TODO validate and process submissions

    // If all else has been validated, hash the password for storage in database
    const hashedPassword = await bcrypt.hash(body.password, 10)
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
            errors: validatedValues.error.flatten().fieldErrors
        }
    }

    // Execute insert statement with validated values to create user account
    const sqlResponse = await executeStatement(validatedValues.data, insertStatement);
    const responseValues = await sqlResponse.json();
    console.log("Response Values: ", responseValues);

    // Get user_id from database for newly created user for use in session cookie
    const findUserIdResponse = await executeStatement({username: validatedValues.data.username}, "SELECT user_id FROM `knowledgepool`.`user` WHERE username = ?");
    const userId = await findUserIdResponse.json();
    console.log("UserID:", userId);
    await createSession(userId);

    const response = {
        message: "Thanks for signing up! We will verify your account creation shortly.",
        received: body,
        creationStatus: true
    }
    return NextResponse.json(response);
}