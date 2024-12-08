/* Documentation: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching */

import { getPost } from "@/app/actions/post";
import KnowledgeDrop from "@/components/KnowledgeDrop";
import { isPostForDisplay } from "@/types/post";

export default async function Post({params}: {params: Promise<{post_id: number}>}) {
    const {post_id} = await params;
    const post = await getPost(post_id);

    if (isPostForDisplay(post)) {
        return (
            <main>
                <KnowledgeDrop post={post} />
            </main>
        );
    }
    else {
        return (
            <main>
                <p>Error parsing content:</p>
                <p>{JSON.stringify(post)}</p>
            </main>
        )
    }
}