
import { getPostForReview, submitReview } from "@/app/actions/review";
import { getSession } from "@/app/lib/session";
import ParsedContent from "@/components/ParsedContent";
import { Post, Review } from "@/types/review";
import "./styles.css";
import AutoSizeTextArea from "@/components/AutoSizeTextArea";

async function handleSubmit(formData: FormData) {
    "use server"
    const session = await getSession();
    console.log("handlesubmit session", session?.user_id);
    // TODO validate fields
    const validatedFields: Review = {
        user_id: parseInt(session?.user_id),
        post_id: parseInt(formData.get('post_id')),
        rating: formData.get('rating'),
        comments: formData.get('comments')
    }

    console.log("Review Submitted:", validatedFields);

    let submissionMessage = await submitReview(validatedFields);
    console.log("Review Submission Message:", submissionMessage)
}

export default async function Page({params}: {params: Promise<{post_id: number}>}) {
    const {post_id} = await params;
    const post: Post = await getPostForReview(post_id);
    console.log("Component received post to review");
    console.log(post);
    const content = post.content;

    return (
        <main>
            <h1 className="page-title">Filtration System</h1>
            <p className="page-paragraph">Read this Drop of Knowledge and consider if it meaningfully contributes to the KnowledgePool. Here are some questions to consider when giving feedback:</p>
            <ul className="page-ul">
                <li className="page-li">Are there any grammatical errors that should be fixed?</li>
                <li className="page-li">Do you feel that this Drop better informed you about its topic?</li>
                <li className="page-li">Has the author demonstrated credibility in their writing? For example, did they use a varitey of reputable sources or create a controlled experiment?</li>
                <li className="page-li">Does this Drop show intentionality or does it feel haphazardly created?</li>
                <li className="page-li">Will this Drop of Knowledge contribute to an ecosystem of critical thought?</li>
            </ul>
            <section className="article-knowledge-drop">
                <h2 className="page-title">{post.title}</h2>
                <h3 className="version-heading">Version {post.version}</h3>
                <div className="knowledge-drop-section-summary">
                    <h2>Snapshot</h2>
                    <p className="knowledge-drop-summary">{post.summary}</p>
                </div>
                <ParsedContent content={content} />
            </section>
            <form action={handleSubmit}>
                <h2 className="page-title">Filtration Form</h2>
                <input type="hidden" name="post_id" value={post.post_id} />
                <fieldset className="radio-fieldset">
                    <legend className="page-paragraph">What Rating Would You Give this Drop?</legend>
                    <label>
                        <input type="radio" name="rating" value="Approved" required />
                        Approved
                    </label>
                    <label>
                        <input type="radio" name="rating" value="Needs Work" required />
                        Needs Work
                    </label>
                    <label>
                        <input type="radio" name="rating" value="Rejected" required />
                        Rejected
                    </label>
                </fieldset>
                <div className="comments-field">
                    <label htmlFor="comments">Comments</label>
                    <AutoSizeTextArea id="comments" name="comments" placeholder="Include feedback to help the author improve their submission. If the Drop is already crisp and clean, share any relevant thoughts that could be interesting to explore in the future!" />
                </div>

                <button type="submit" className="submit-button">Complete Filtration</button>
            </form>
        </main>
    )
}