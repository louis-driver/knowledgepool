import { getReviewsForPost } from "@/app/actions/post";
import { Review } from "@/types/review";

export default async function Pages({params}: {params: Promise<{post_id: number}>}) {
    const {post_id} = await params;
    const reviews: Review[] = await getReviewsForPost(post_id);
    console.log("Reviews:", reviews);

    return (
        <main>
            {/* Conditionally render message if post has no reviews */
            reviews.length == 0 &&
                <p>Looks like your Drop is still waiting to be filtered!</p>
            }
            {/* Create a card for each review */
            reviews.map((review: Review) => 
                <section key={review.review_id}>
                    <h2>Approval: <span>{review.approval_rating}</span></h2>
                    <p>{review.comments}</p>
                </section>
            )}
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