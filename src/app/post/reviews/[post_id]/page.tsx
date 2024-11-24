import { getPost, getReviewsForPost } from "@/app/actions/post";
import KnowledgeDrop from "@/components/KnowledgeDrop";
import { Review } from "@/types/review";
import "./styles.css";

export default async function Pages({params}: {params: Promise<{post_id: number}>}) {
    const {post_id} = await params;
    const post = await getPost(post_id);
    const reviews: Review[] = await getReviewsForPost(post_id);
    console.log("Reviews:", reviews);

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