import { createUser } from "@/app/actions/auth";
import { SignupFormSchema } from "@/app/lib/signup";
import Link from "next/link";
import { redirect } from "next/navigation";
import "../styles.css";

async function handleSubmit(formData: FormData) {
    "use server"
    console.log("handleSubmit called.");

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

    // Send data to api
    let submissionMessage = await createUser(validatedFields.data);
    console.log("Submission Message:", submissionMessage);
        
    if (submissionMessage.creationStatus)
        redirect('/post');
}

export default function Page() {
    "use client"
    //const [formState, formAction] = useActionState(handleSubmit, undefined);

    return (
        <main>
            <h1 className="page-title">Welcome to KnowledgePool!</h1>
            <form action={handleSubmit} className="user-form">
                <div className="input-field">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" id="firstname" name="firstname" required />
                </div>
                {/*{formState?.errors?.firstname && <p>{formState.errors.firstname}</p>}
                */}
                <div className="input-field">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" id="lastname" name="lastname" required />
                </div>
                {/*{formState?.errors?.lastname && <p>{formState.errors.lastname}</p>}
                */}
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                {/*{formState?.errors?.firstname && <p>{formState.errors.firstname}</p>}
                */}
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>

                <button type="submit" className="submit-button">Let's Swim!</button>
                <Link href={"/user/signin"} className="form-link">Already have an account?</Link>
            </form>
        </main>
    );
}