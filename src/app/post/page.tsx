/* Documentation: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching */

import Link from "next/link"
import { notFound } from "next/navigation"
import { getPosts } from "../actions/post"
import ParsedContent from "@/components/ParsedContent"

interface Post {
    post_id: number
    username: string
    title: string
    summary: string
}

/* According to https://vercel.com/blog/common-mistakes-with-the-next-js-app-router-and-how-to-fix-them 
 it may be better to put my GET requests within the pages rather than
 fetching from an api folder, so that may be worth researching 
 and refactoring later
 */

export async function generateStaticParams() {
    let posts = await fetch('http://localhost:3000/api/post/').then((res) =>
        res.json()
    );

    return posts.map((post: Post) => ({
        id: post.post_id,
    }));
}

export async function generateMetadata() {
    let posts = await getPosts();

    return posts.map((post: Post) => ({
        titles: post.title,
    }));
}

export default async function Page() {
    let posts: Post[] = await getPosts();

    return (
        <main>
            {posts.map((post: Post) =>
                <article key={post.post_id}>
                    <h1>{post.title}</h1>
                    <h2>{post.username}</h2>
                    <p>{post.summary}</p>
                    <Link href={`/post/${post.post_id}`}>Check out this Drop</Link>
                </article>
            )}
        </main>
    );
}