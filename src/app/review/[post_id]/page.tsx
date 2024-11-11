
import { getPostForReview, submitReview } from "@/app/actions/review";
import { getSession } from "@/app/lib/session";
import ParsedContent from "@/components/ParsedContent";
import { Post, Review } from "@/types/review";

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
    // TODO create function to parse variable content data
    const content = post.content;

    return (
        <main>
            <p>Review this post.</p>
            <section>
                    <h2>{post.title}</h2>
                    <h3>Version <span>{post.version}</span></h3>
                    <p>{post.summary}</p>
                    <ParsedContent content={content} />
            </section>
            <form action={handleSubmit}>
                <input type="hidden" name="post_id" value={post.post_id} />
                <div className="input-field">
                    <input type="radio" id="rating" name="rating" value="Approved" required />
                    <label htmlFor="rating">Approved</label>
                    <input type="radio" id="rating" name="rating" value="Needs Work" required />
                    <label htmlFor="rating">Needs Work</label>
                    <input type="radio" id="rating" name="rating" value="Rejected" required />
                    <label htmlFor="rating">Rejected</label>
                </div>
                <div className="input-field">
                    <label htmlFor="comments">Comments</label>
                    <textarea id="comments" name="comments" required />
                </div>

                <button type="submit">Complete Filtration</button>
            </form>
        </main>
    )
}