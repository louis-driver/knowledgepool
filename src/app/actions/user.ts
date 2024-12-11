"use server"

import { redirect } from "next/navigation";
import { SignupFormSchema } from "../lib/signup";
import { authenticateUser, createUser } from "./auth";
import { SigninFormSchema } from "../lib/signin";

export async function submitUser(prevState: void | null, formData: FormData) {

    console.log("handleSubmit called.");
    console.log("Received:", formData);

    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname')
    })

    //If any form fields are invalid return early
    if (!validatedFields.success) {
        console.log("Fields not validated");
        console.log(validatedFields);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Could not submit user."
        }
    }

    // Send data to api
    let submissionMessage = await createUser(validatedFields.data);
    console.log("Submission Message:", submissionMessage);
        
    if (submissionMessage.creationStatus)
        redirect('/post');
    else 
        return submissionMessage;
}

export async function signinUser(prevState: void | null, formData: FormData) {

    // Validate form fields
    const validatedFields = SigninFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password')
    })

    //If any form fields are invalid in format return early
    if (!validatedFields.success) {
        console.log("Fields not validated");
        console.log(validatedFields);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Incorrect username or password."
        }
    }

    console.log("Submitted:", validatedFields.data);

    // Verify user exists and that the submitted password is valid
    const submissionMessage = await authenticateUser(validatedFields.data)
    console.log("Submission Message:", submissionMessage);

    // Server could not respond to the request
    if (!submissionMessage) {
        return {
            message: 'An error occurred while signing you in.'
        }
    }
    // Redirect to view posts if the user was authenticated
    else if (submissionMessage.authenticated)
        redirect('/post');
    else
        return submissionMessage;
}   