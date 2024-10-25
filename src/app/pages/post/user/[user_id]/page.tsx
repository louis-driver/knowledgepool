/* Documentation: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching */

import { notFound } from "next/navigation"

interface Post {
    username: string
    title: string
    summary: string
}

async function getPosts(user_id: string) {
    console.log("Fetching posts by user", {user_id});
    let res = await fetch(`http://localhost:3000/api/post/${user_id}`);
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
    console.log("Component received Category ID:", {user_id});
    const posts = await getPosts(user_id);

    console.log(posts);

    return (
        <main>
            {posts.map((post: Post) =>
                <article key={post.username}>
                    <h1>{post.title}</h1>
                    <h2>{post.username}</h2>
                    <p>{post.summary}</p>
                </article>
            )}
        </main>
    );
}