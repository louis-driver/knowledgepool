import { getReviewedPosts } from "@/app/actions/post";
import { getSession } from "@/app/lib/session";
import { Post } from "@/types/review";
import Link from "next/link";

export default async function Page() {
    const user_id = (await getSession())?.user_id;
    let posts = await getReviewedPosts(user_id);

    return (
        <main>
            <p>Here are your Knowledge Drops that are pending filtration.</p>
            {posts.map((post: Post) =>
                <article key={post.post_id}>
                    <h1>{post.title}</h1>
                    <p>{post.summary}</p>
                    <Link href={`/post/reviews/${post.post_id}`}>See Reviews for this Drop</Link>
                </article>
            )}
        </main>
    );
}