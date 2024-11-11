export interface Review {
    user_id: number,
    post_id: number,
    rating: string,
    comments: string
}

export interface Post {
    post_id: number,
    user_id: number,
    response_to: number | null,
    version_of: number | null,
    version: number,
    title: string,
    summary: string,
    content: any,
    create_time: string
}