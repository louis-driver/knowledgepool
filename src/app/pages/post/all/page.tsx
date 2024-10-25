/* Documentation: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching */

import { notFound } from "next/navigation"

interface Post {
    username: string
    title: string
    summary: string
}

async function getPosts() {
    let res = await fetch(`http://localhost:3000/api/post/all`);
    let posts: Post[] = await res.json();
    if (!posts) notFound();
    return posts;
}

export async function generateStaticParams() {
    let posts = await fetch('http://localhost:3000/api/post/all').then((res) =>
        res.json()
    );

    return posts.map((post: Post) => ({
        id: post.username,
    }));
}

export async function generateMetadata() {
    let posts = await getPosts();

    return posts.map((post: Post) => ({
        titles: post.title,
    }));
}

export default async function Page() {
    let posts = await getPosts();

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