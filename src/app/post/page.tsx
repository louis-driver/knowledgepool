/* Documentation: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching */

import Link from "next/link";
import { getPosts } from "../actions/post";
import "./styles.css"

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
            <h1 className="page-title">Drops of Knowledge</h1>
            {posts.map((post: Post) =>
                <article key={post.post_id} className="knowledge-drop-card">
                    <h1 className="card-title">{post.title}</h1>
                    <h2 className="card-author"><span className="by-author">By</span> {post.username}</h2>
                    <p className="card-summary">{post.summary}</p>
                    <div className="call-to-action">
                        <div className="logo-drop" />
                        <Link href={`/post/${post.post_id}`}>Check out this Drop</Link>
                    </div>
                </article>
            )}
        </main>
    );
}