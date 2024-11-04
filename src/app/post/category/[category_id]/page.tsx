/* Documentation: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching */

import { notFound } from "next/navigation"

interface Post {
    username: string
    title: string
    summary: string
}

async function getPosts(category_id: string) {
    console.log("Fetching posts for category", {category_id});
    let res = await fetch(`http://localhost:3000/api/post/${category_id}`);
    let posts: Post[] = await res.json();
    if (!posts) notFound();
    return posts;
}

/*
export async function generateStaticParams(category_id: string) {
    let posts = await getPosts(category_id);
    console.log("Post in generateStaticParams", posts);

    return posts.map((post: Post) => ({
        id: post.username,
    }));
}*/

export async function generateMetadata(category_id: string) {
    let posts = await getPosts(category_id);

    return posts.map((post: Post) => ({
        title: post.title,
    }));
}

export default async function Post({params}: {params: Promise<{category_id: string}>}) {
    const {category_id} = await params;
    console.log("Component received Category ID:", {category_id});
    const posts = await getPosts(category_id);

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