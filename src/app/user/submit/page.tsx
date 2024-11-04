'use client'

import { SignupFormSchema } from "@/app/lib/signup";
import { redirect } from "next/navigation";

async function handleSubmit(formData: FormData) {
    console.log("handleSubmit called.");

    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname')
    })

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
    
    if (submissionMessage.creationStatus)
        redirect('/post');
    else
        redirect('/user/signin');
}

export default function Page() {
    //const [formState, formAction] = useActionState(handleSubmit, undefined);

    return (
        <>
            <h1>Welcome to KnowledgePool!</h1>
            <form action={handleSubmit} >
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

                <button type="submit">Let's Swim!</button>
            </form>
        </>
    );
}