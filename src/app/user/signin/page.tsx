import { authenticateUser } from "@/app/actions/auth";
import { SigninFormSchema } from "@/app/lib/signin";
import { redirect } from "next/navigation";
import Link from "next/link";
import "../styles.css"

async function handleSubmit(formData: FormData) {
    "use server"

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

    console.log("Submitted:", validatedFields.data);

    // Verify user exists and that the submitted password is valid
    const submissionMessage = await authenticateUser(validatedFields.data)
    console.log("Submission Message:", submissionMessage);

    // Server could not respond to the request
    if (!submissionMessage) {
        console.log('An error occurred while signing you in.');
    }

    // Redirect to view posts if the user was authenticated
    if (submissionMessage.authenticated)
        redirect('/post');
    else
        redirect('/user/signin');
}

export default function Page() {
    "use client"
    //TODO learn how useActionState to add error messages to login
    return (
        <main>
            <h1 className="page-title">Take a Dip in the KnowledgePool</h1>
            <form action={handleSubmit} className="user-form">
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>

                <button type="submit"  className="submit-button">Let's Swim!</button>
                <Link href={"/user/submit"} className="form-link">Already have an account?</Link>
            </form>
        </main>
    );
  }