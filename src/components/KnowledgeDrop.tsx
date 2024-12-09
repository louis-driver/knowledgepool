import { dateToFormatted } from "@/app/lib/convert";
import Link from "next/link";
import ParsedContent from "./ParsedContent";
import "./styles/KnowledgeDrop.css"
import { PostForDisplay } from "@/types/post";

interface Props {
    post: PostForDisplay
}

export default function KnowledgeDrop({post}: Props) {
    const date = new Date(post.create_time)
    const formattedDate = dateToFormatted(date);
    const content = post.content;
    
    return (
        <article key={post.post_id} className="article-knowledge-drop">
            <h1 className="knowledge-drop-title">{post.title}</h1>
            <div className="knowledge-drop-subheadings">
                <h2 className="knowledge-drop-author"><span className="by-author">By</span> {post.username}</h2>
                <h2 className="knowledge-drop-date">{formattedDate}</h2>                </div>
                {post.response_to != null &&
                    <Link href={`/post/${post.response_to}`} className="knowledge-drop-response">In Response To</Link>
                }
            <div className="knowledge-drop-section-summary">
                <h2>Snapshot</h2>
                <p className="knowledge-drop-summary">{post.summary}</p>
            </div>
            <ParsedContent content={content} />
        </article>
    )
}