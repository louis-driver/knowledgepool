import { FormResponse } from "@/types/forms"; 
import { SignupFormSchema } from "@/lib/signup";

async function createUser(formData: FormData) {
    'use server'

    console.log("createUser called.");

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
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    console.log("Submitted:", validatedFields);

    // Send data to api
    let res = await fetch(`http://localhost:3000/api/user/submit/`, {
        method: 'POST',
        body: JSON.stringify(validatedFields.data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let submissionMessage: FormResponse[] = await res.json();
    console.log("Submission Message:", submissionMessage);

    if (!submissionMessage) {
        console.log('An error occurred while creating your account.');
    }

    // mutate data
    // revalidate cache
}

export default function Page() {
    'use client'

    return (
        <>
            <h1>Welcome to KnowledgePool!</h1>
            <form action={createUser} >
                <div className="input-field">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" id="firstname" name="firstname" required />
                </div>
                <div className="input-field">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" id="lastname" name="lastname" required />
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
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