import { notFound } from "next/navigation";

interface Review {
    id: number,
    approval_rating: string,
    comments: string,
}

async function getReviews() {
    // Fetch reviews for post with the given post_id
    console.log("Fetching reviews for post");
    let res = await fetch(`http://localhost:3000/api/review/all`);
    let reviews: Review[] = await res.json();
    if (!reviews) notFound();
    return reviews;
}

export async function generateMetadata() {
    let reviews = await getReviews();

    return reviews.map((review: Review) => ({
        reviews: review.approval_rating,
    }));
}

export default async function Reviews() {
    let reviews = await getReviews();
    console.log("Component received all reviews");
    console.log(reviews);

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