import submitPost from "@/app/actions/post";
import { getSession } from "@/app/lib/session";
import { PostFormSubmission } from "@/types/post";

async function handleSubmit(formData: FormData) {
    "use server"
    
    const validatedFields: PostFormSubmission = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        content: formData.get('content'),
        resources: formData.get('resources')
    }

    console.log("Knowledge Drop Submitted:", validatedFields);

    /*
    let res = await fetch(`http://localhost:3000/api/post/submit`, {
        method: 'POST',
        body: JSON.stringify(validatedFields),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let submissionMessage = await res.json();*/

    let submissionMessage = await submitPost(validatedFields);
    console.log("Knowledge Drop Submission Message:", submissionMessage)
}

export default function Page() {
    'use client'
    return (
        <>
            <h1>Let's fill the KnowledgePool!</h1>
            <form action={handleSubmit}>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required />
                </div>

                <div className="input-field">
                    <label htmlFor="summary">Summary</label>
                    <textarea id="summary" name="summary" required />
                </div>

                <div className="input-field">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content" required />
                </div>

                <div className="input-field">
                    <label htmlFor="resources">Resources</label>
                    <textarea id="resources" name="resources" required />
                </div>

                <button type="submit">Submit Your Drop of Knowledge!</button>
            </form>
        </>
    );
}