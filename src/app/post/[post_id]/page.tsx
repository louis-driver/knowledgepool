/* Documentation: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching */

import { getPost } from "@/app/actions/post";
import ParsedContent from "@/components/ParsedContent";
import Link from "next/link";
import { notFound } from "next/navigation"
import "./styles.css"
import { dateToFormatted } from "@/app/lib/convert";

interface Post {
    post_id: number,
    username: string,
    response_to: number | null,
    title: string,
    summary: string,
    content: any,
    create_time: string
}

async function getPostFetch(post_id: string) {
    console.log("Fetching post", {post_id});
    let res = await fetch(`http://localhost:3000/api/post/${post_id}`);
    let posts: Post[] = await res.json();
    if (!posts) notFound();
    return posts[0];
}

export default async function Post({params}: {params: Promise<{post_id: number}>}) {
    const {post_id} = await params;
    const post = await getPost(post_id);
    console.log("Component Received:", post)
    const date = new Date(post.create_time)
    const formattedDate = dateToFormatted(date);
    // TODO create function to return components based on content json. Ex: return <h2>Heading</h2><p>Paragraph</p> for {h2: "Heading", p:"Paragraph"}
    const content = post.content;

    return (
        <main>
            <article key={post.post_id} className="article-knowledge-drop">
                <h1 className="knowledge-drop-title">{post.title}</h1>
                <div className="knowledge-drop-subheadings">
                    <h2 className="knowledge-drop-author"><span className="by-author">By</span> {post.username}</h2>
                    <h2 className="knowledge-drop-date">{formattedDate}</h2>
                </div>
                {post.response_to != null &&
                    <Link href={`/post/${post.response_to}`} className="knowledge-drop-response">In Response To</Link>
                }
                <div className="knowledge-drop-section-summary">
                    <h2>Snapshot</h2>
                    <p className="knowledge-drop-summary">{post.summary}</p>
                </div>
                <ParsedContent content={content} />
            </article>
        </main>
    );
}