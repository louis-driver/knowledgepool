/* Documentation: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching */

import Link from "next/link";
import { getPosts } from "../actions/post";
import "./styles.css"
import { isPostCardForDisplayArray, PostCardForDisplay } from "@/types/post";

export default async function Page() {
    let posts = await getPosts();

    return (
        <main>
            <h1 className="page-title">Drops of Knowledge</h1>
            { isPostCardForDisplayArray(posts) ? (
                posts.map((post: PostCardForDisplay) => {
                    return (
                        <article key={post.post_id} className="knowledge-drop-card">
                            <h1 className="card-title">{post.title}</h1>
                            <h2 className="card-author"><span className="by-author">By</span> {post.username}</h2>
                            <p className="card-summary">{post.summary}</p>
                            <div className="call-to-action">
                                <div className="logo-drop" />
                                <Link href={`/post/${post.post_id}`}>Check out this Drop</Link>
                            </div>
                        </article>
                    )
                })
            ) : (
                <>
                    <p className="page-paragraph">Sorry! We are unable to fetch posts at this time. Please contact support@email.com so we can fix this issue.</p>
                    <p>{JSON.stringify(posts)}</p>
                </>
            )}
        </main>
    );
}