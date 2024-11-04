
'use client'

import { SigninFormSchema } from "@/app/lib/signin";
import { redirect } from "next/navigation";

async function authorizeUser(formData: FormData) {
    console.log("authorizeUser called.");

    // Validate form fields
    const validatedFields = SigninFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password')
    })

    //If any form fields are invalid return early
    if (!validatedFields.success) {
        console.log("Fields not validated");
        console.log(validatedFields);
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    console.log("Submitted:", validatedFields);

    // Send data to api
    let res = await fetch(`http://localhost:3000/api/user/signin/`, {
        method: 'POST',
        body: JSON.stringify(validatedFields.data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let submissionMessage = await res.json();
    console.log("Submission Message:", submissionMessage);

    if (!submissionMessage) {
        console.log('An error occurred while signing you.');
    }

    if (submissionMessage.authenticated)
        redirect('/post');
    else
        redirect('/user/signin');
}

export default function Page() {

    return (
        <>
            <h1>Welcome to KnowledgePool!</h1>
            <form action={authorizeUser} >
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>

                <button type="submit">Let's Swim!</button>
            </form>
        </>
    );
  }