import Link from "next/link";
import { getPostsForReview } from "../actions/review";
import { isPostForReviewArray, PostForReview } from "@/types/review";

export default async function Reviews() {
    let posts = await getPostsForReview();
    console.log("Component received posts to review");
    console.log(posts);

    return (
        <main>
            <h1 className="page-title">Drops to Filter</h1>
            { isPostForReviewArray(posts) ? (
                <>
                <p className="page-paragraph">Help keep our water clean! Review one of these Drops of Knowledge to ensure the integrity of information on the platform. Critique is expected and <i>welcome</i> so don't be afraid to share your thoughts! Feedback is what allows us to continually improve as individuals after all.</p>
                {posts.map((post: PostForReview) => {
                    return (
                        <section key={post.post_id} className="knowledge-drop-card">
                            <h2 className="card-title">{post.title}</h2>
                            <p className="card-summary">{post.summary}</p>
                            <div className="call-to-action">
                                <div className="logo-drop" />
                                <Link href={`/review/${post.post_id}`}>Let's Filter This Drop</Link>
                            </div>
                        </section>
                    )
                })}
                </>
            ) : (
                <p className="page-paragraph">No Drops to filter. Go apply what you've learn to create your own Drop of Knowledge!</p>
            )
            }
        </main>
    )
}

// https://nextjs.org/docs/app/api-reference/file-conventions/page 

/*
export async function getServerSideProps(context) {
    const { id } = context.params; // Get the dynamic route parameter
    const res = await fetch(`https://localhost:3000/review/${id}`);
    const reviews = await res.json();
  
    return {
      props: { reviews }, // Pass review data to the component
    };
  }
    */