/*
'use client'

import { useActionState } from "react";
import { createUser } from '@/app/actions/auth';

export default async function Page() {
    const [formState, formAction] = useActionState(createUser, undefined);

    return (
        <>
            <h1>Welcome to KnowledgePool!</h1>
            <form action={formAction} >
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
                {formState?.errors?.firstname && <p>{formState.errors.firstname}</p>}
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
*/