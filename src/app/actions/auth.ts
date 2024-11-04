import { createSession } from "@/app/lib/session";
import { FormState, SignupFormSchema } from "@/app/lib/signup";
import { redirect } from "next/navigation";

export async function createUser(state: FormState, formData: FormData) {
    console.log("createUser called.");
    console.log("Form Data:", formData);

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
    let submissionMessage = await res.json();
    console.log("Submission Message:", submissionMessage);

    if (!submissionMessage) {
        console.log('An error occurred while creating your account.');
    }

    // TODO If account creation is successful generate cookies
    const userId = "userId goes here"; // TODO get userId after account creation
    await createSession(userId);
    
    // Redirect user after successful account creation
    redirect('/pages/post');
}