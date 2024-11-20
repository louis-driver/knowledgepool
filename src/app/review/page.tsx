import Link from "next/link";
import { getPostsForReview } from "../actions/review";
import { Post } from "@/types/review";
import "./styles.css";

export default async function Reviews() {
    let posts = await getPostsForReview();
    console.log("Component received posts to review");
    console.log(posts);

    return (
        <main>
            <p>Here are some posts you can review.</p>
            {posts.map((post: Post) => 
                <section key={post.post_id}>
                    <h2 className="card-title">{post.title}</h2>
                    <p className="card-summary">{post.summary}</p>
                    <Link href={`/review/${post.post_id}`}>Let's Filter This Drop</Link>
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