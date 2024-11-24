import { getReviewedPosts } from "@/app/actions/post";
import { getSession } from "@/app/lib/session";
import { Post } from "@/types/review";
import Link from "next/link";
import "./styles.css"
import { getApprovalRatings } from "@/app/actions/review";

export default async function Page() {
    const user_id = (await getSession())?.user_id;
    let posts = await getReviewedPosts(user_id);

    return (
        <main>
            <h1 className="page-title">My Drops</h1>
            <p className="page-paragraph">Here are your submitted Drops of Knowledge. Select any Drop to see how you can improve your submission.</p>
            {await posts.map((post: Post) => mapPost(post))}
        </main>
    );
}

interface Rating {
    review_id: number,
    approval_rating: string,
}
async function mapPost(post: Post) {
    let ratings = await getApprovalRatings(post.post_id);
    console.log("Ratings:", ratings);
    let numApproved: number = 0;
    let numNeedsWork: number = 0;
    let numRejected: number = 0;
    ratings.forEach((rating: Rating) => {
        if (rating.approval_rating === "Approved")
            numApproved += 1;
        else if (rating.approval_rating === "Needs Work")
            numNeedsWork += 1;
        else if (rating.approval_rating === "Rejected")
            numRejected += 1;
    })
    let approvalStatus: string = "";
    if (numRejected >= 2)
        approvalStatus = "Rejected";
    else if (numApproved >= 3)
        approvalStatus = "Approved";
    else if (numNeedsWork >= 2 || numNeedsWork >= 1 && numRejected >= 1)
        approvalStatus = "Needs Work";
    else
        approvalStatus = "Pending";

    return (
        <article key={post.post_id} className="knowledge-drop-card">
            <h1 className="card-title">{post.title}</h1>
            <h2 className="approval-status">Approval Status: <b>{approvalStatus}</b></h2>
            <p className="card-summary">{post.summary}</p>
            <div className="call-to-action">
                <div className="logo-drop" />
                <Link href={`/post/reviews/${post.post_id}`}>See Reviews for this Drop</Link>
            </div>
        </article>
    )
}