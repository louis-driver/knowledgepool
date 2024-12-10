'use client'
import Link from "next/link";
import "../styles.css";
import { useActionState } from "react";
import { submitUser } from "@/app/actions/user";

export default function Page() {
    const [formState, formAction, isPending] = useActionState(submitUser, null);

    return (
        <main>
            <h1 className="page-title">Welcome to KnowledgePool!</h1>
            <form action={formAction} className="user-form">
                <div className="input-field">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" id="firstname" name="firstname" required />
                </div>
                {formState?.errors?.firstname && <p>{formState.errors.firstname}</p>}
                
                <div className="input-field">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" id="lastname" name="lastname" required />
                </div>
                {formState?.errors?.lastname && <p>{formState.errors.lastname}</p>}
                
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                {formState?.errors?.email && <p>{formState.errors.email}</p>}
                
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                {formState?.errors?.username && <p>{formState.errors.username}</p>}

                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                {formState?.errors?.password && <p>{formState.errors.password}</p>}

                <button type="submit" className="submit-button">Let's Swim!</button>
                <Link href={"/user/signin"} className="form-link">Already have an account?</Link>
                {isPending ? "Loading..." : formState?.message}
            </form>
        </main>
    );
}