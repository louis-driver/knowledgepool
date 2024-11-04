import { notFound } from "next/navigation";

interface Review {
    id: number,
    approval_rating: string,
    comments: string,
}

async function getReviews(post_id: string) {
    // Fetch reviews for post with the given post_id
    console.log("Fetching reviews for post", {post_id});
    let res = await fetch(`http://localhost:3000/api/review/${post_id}`);
    let reviews: Review[] = await res.json();
    if (!reviews) notFound();
    return reviews;
}

export async function generateMetadata(post_id: string) {
    let reviews = await getReviews(post_id);

    return reviews.map((review: Review) => ({
        reviews: review.approval_rating,
    }));
}

export default async function Reviews({params}: {params: Promise<{post_id: string}>}) {
    const {post_id} = await params;
    const reviews = await getReviews(post_id);

    return (
        <main>
            {reviews.map((review: Review) => 
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