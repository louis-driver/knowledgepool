/* Documentation: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching */

import { getPost } from "@/app/actions/post";
import KnowledgeDrop from "@/components/KnowledgeDrop";

interface Post {
    post_id: number,
    username: string,
    response_to: number | null,
    title: string,
    summary: string,
    content: any,
    create_time: string
}

export default async function Post({params}: {params: Promise<{post_id: number}>}) {
    const {post_id} = await params;
    const post = await getPost(post_id);

    return (
        <main>
            <KnowledgeDrop post={post} />
        </main>
    );
}