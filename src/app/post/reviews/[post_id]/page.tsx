import { getPost, getReviewsForPost } from "@/app/actions/post";
import KnowledgeDrop from "@/components/KnowledgeDrop";
import { isReviewArray, Review } from "@/types/review";
import "./styles.css";
import { isPostForDisplay } from "@/types/post";

export default async function Pages({params}: {params: Promise<{post_id: number}>}) {
    const {post_id} = await params;
    const post = await getPost(post_id);
    const reviews = await getReviewsForPost(post_id);

    if (isPostForDisplay(post)) {
        if (isReviewArray(reviews)) {
            return (
                <main>
                    <h1 className="page-title">Reviews</h1>
                    {/* Conditionally render message if post has no reviews */
                    reviews.length == 0 &&
                        <p className="page-paragraph">Looks like your Drop is still waiting to be filtered!</p>
                    }
                    {/* Create a card for each review */
                    reviews.map((review: Review) => 
                        <section key={review.review_id} className="knowledge-drop-card">
                            <h2 className="review-card-title">Rating: <b>{review.approval_rating}</b></h2>
                            <p className="review-card-comments">{review.comments}</p>
                        </section>
                    )}
                    <h1 className="page-title">Drop Reviewed</h1>
                    <KnowledgeDrop post={post} />
                </main>
            )
         }
         else {
            return (
                <main>
                    <p className="page-paragraph">Error occurred while fetching reviews for this post.</p>
                    <h2 className="page-title">Status: {reviews.returnedStatus}</h2>
                    <p className="page-paragraph">{reviews.error}</p>
                </main>
            )
         }
    }
    else {
        return (
            <main>
                <h2 className="page-title">Status: {post.returnedStatus}</h2>
                <p className="page-paragraph">{post.error}</p>
            </main>
        )
    }
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