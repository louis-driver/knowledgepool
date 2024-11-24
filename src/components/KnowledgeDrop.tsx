import { dateToFormatted } from "@/app/lib/convert";
import Link from "next/link";
import ParsedContent from "./ParsedContent";
import "./styles/KnowledgeDrop.css"

export default function KnowledgeDrop(props) {
    const post = props.post;
    console.log("Component Received:", post)
    const date = new Date(post.create_time)
    const formattedDate = dateToFormatted(date);
    // TODO create function to return components based on content json. Ex: return <h2>Heading</h2><p>Paragraph</p> for {h2: "Heading", p:"Paragraph"}
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