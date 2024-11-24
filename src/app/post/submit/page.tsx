import { submitPost } from "@/app/actions/post";
import AutoSizeTextArea from "@/components/AutoSizeTextArea";
import { PostFormSubmission } from "@/types/post";
import "./styles.css"

async function handleSubmit(formData: FormData) {
    "use server"
    
    const validatedFields: PostFormSubmission = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        content: formData.get('content'),
        resources: formData.get('resources')
    }

    console.log("Knowledge Drop Submitted:", validatedFields);

    let submissionMessage = await submitPost(validatedFields);
    console.log("Knowledge Drop Submission Message:", submissionMessage)
}

export default function Page() {
    "use client"

    return (
        <main>
            <h1 className="page-title">Let's Fill the KnowledgePool!</h1>
            <p className="page-paragraph">You're contributing to the KnowledgePool, that's awesome! Here are some things to understand when creating a Drop of Knowledge:</p>
            <ul className="page-ul">
                <li className="page-li">The purpose of your Drop should be to share something you've learned or to teach others about a topic.</li>
                <li className="page-li">Your Drop will be reviewed by your peers before it is published for the masses.</li>
                <li className="page-li">First versions of submissions may not be approved and that's okay! Our filtration system is designed to help you improve your content and guarantee that only "clean", quality Drops fill the KnowledgePool.</li>
            </ul>
            <p className="page-paragraph">Now jump in!</p>
            <form action={handleSubmit} className="form-drop-submission">
                <div className="input-field">
                    <AutoSizeTextArea id="title" name="title" className="textarea-autosize-title" placeholder="Title" />
                </div>

                <div className="input-field">
                    <label htmlFor="summary">Snapshot</label>
                    <AutoSizeTextArea id="summary" name="summary" placeholder="Give a brief summary or attention getter to let readers know if your Drop is of interest to them." />
                </div>

                <div className="input-field">
                    <label htmlFor="content">Content</label>
                    <AutoSizeTextArea id="content" name="content" placeholder="This is where the water flows! Write about what you want to inform others about and how you came to the conclusions you did." />
                </div>

                <div className="input-field">
                    <label htmlFor="resources">Resources</label>
                    <AutoSizeTextArea id="resources" name="resources" placeholder="Share any resources that you got your information from or that would be useful to readers who would like to engage more with the topic." />
                </div>

                <button type="submit" className="submit-button">Fill the Pool!</button>
            </form>
        </main>
    );
}