import { NextRequest, NextResponse } from 'next/server';
import bcrypt, { compare } from 'bcrypt';
import { executeStatement } from '../../util/executeStatement';
import { FormResponse } from '@/types/forms';

export async function POST(request: NextRequest) {
    console.log("Begin POST request submit user");
    const body = await request.json();
    console.log("POST body:", body);


    // Write query to find user and compare password hash
    const selectStatement = "SELECT username, password FROM user WHERE username = ?";

    // TODO validate and process submissions
    // TODO compare to hash password
    const validatedValues = {
        username: body.username
    };

    // Execute statement to get username and password for comparison
    const sqlResponse = await executeStatement(validatedValues, selectStatement);
    const responseValues = await sqlResponse.json();
    console.log("signin received response:", responseValues);


    console.log("Comparing passwords:", body.password, responseValues[0].password);
    // Compare provided password and stored password
    const authenticated = await compare(body.password, responseValues[0].password);
    console.log("Passwords Match:", authenticated);

    let authenticationMessage;
    // Check for authentication to access resources
    // TODO provide JSON Web Token and redirect user to home page if authenticated
    if (!authenticated) {
        authenticationMessage = "We are unable to authenticate your request.";  
    }
    else {
        authenticationMessage = "You're all signed in!";
    }

    const response = {
        message: authenticationMessage,
        authenticated: authenticated
    }
    
    return NextResponse.json(response);
}