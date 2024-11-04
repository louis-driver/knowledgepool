import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { executeStatement } from '../../util/executeStatement';
import { FormResponse } from '@/types/forms';

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
    const validatedValues = {
        username: body.username,
        email: body.email,
        password: hashedPassword,
        firstname: body.firstname,
        lastname: body.lastname
    };

    // Execute insert statement with validated values to create user account
    const sqlResponse = await executeStatement(validatedValues, insertStatement);
    const responseValues = await sqlResponse.json();
    console.log("Response Values: ", responseValues);

    const response = {
        message: "Thanks for signing up! We will verify your account creation shortly.",
        received: body,
        creationStatus: true
    }
    return NextResponse.json(response);
}