/* Documentation: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching */

import { notFound } from "next/navigation"

interface Post {
    post_id: string
    username: string
    title: string
    summary: string
}

async function getPosts(user_id: string) {
    console.log("Fetching posts by user", {user_id});
    let res = await fetch(`http://localhost:3000/api/post/user/${user_id}`);
    let posts: Post[] = await res.json();
    if (!posts) notFound();
    return posts;
}

export async function generateMetadata(user_id: string) {
    let posts = await getPosts(user_id);

    return posts.map((post: Post) => ({
        title: post.title,
    }));
}

export default async function Post({params}: {params: Promise<{user_id: string}>}) {
    const {user_id} = await params;
    const posts = await getPosts(user_id);

    return (
        <main>
            {posts.map((post: Post) =>
                <article key={post.post_id}>
                    <h1>{post.title}</h1>
                    <h2>{post.username}</h2>
                    <p>{post.summary}</p>
                </article>
            )}
        </main>
    );
}