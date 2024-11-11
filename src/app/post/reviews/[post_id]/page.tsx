import { getReviewsForPost } from "@/app/actions/post";
import { notFound } from "next/navigation";

interface Review {
    id: number,
    approval_rating: string,
    comments: string,
}

export default async function Pages({params}: {params: Promise<{post_id: number}>}) {
    const {post_id} = await params;
    const reviews = await getReviewsForPost(post_id);

    return (
        <main>
            {/* Conditionally render message if post has no reviews */
            reviews.length == 0 &&
                <p>Looks like your Drop is still waiting to be filtered!</p>
            }
            {/* Create a card for each review */
            reviews.map((review: Review) => 
                <section key={review.id}>
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