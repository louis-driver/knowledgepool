"use client"

import Link from "next/link";
import "../styles.css"
import { signinUser } from "@/app/actions/user";
import { useActionState } from "react";

export default function Page() {
    const [formState, formAction, isPending] = useActionState(signinUser, null);

    //TODO learn how useActionState to add error messages to login
    return (
        <main>
            <h1 className="page-title">Take a Dip in the KnowledgePool</h1>
            <form action={formAction} className="user-form">
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>

                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                
                <button type="submit"  className="submit-button">Let's Swim!</button>
                <Link href={"/user/submit"} className="form-link">New to the Pool? Sign Up!</Link>
                {isPending ? "Loading..." : formState?.message}
            </form>
        </main>
    );
  }