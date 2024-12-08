import { isNonDynamicContent, isParsableArray, NonDynamicContent, ParsableHTMLElement } from "./parsedContent"

export interface ReviewSubmission {
    post_id: number,
    user_id: number,
    approval_rating: string,
    comments: string
}

export interface Review {
    review_id: number,
    post_id: number,
    user_id: number,
    approval_rating: string,
    comments: string,
    create_time: string
}

export interface PostForReview {
    post_id: number,
    user_id: number,
    response_to: number | null,
    version_of: number | null,
    version: number,
    title: string,
    summary: string,
    content: ParsableHTMLElement[] | NonDynamicContent,
    create_time: string
}

export function isPostForReview(value: any): value is PostForReview {
    return (
        value &&
        typeof value.post_id === "number" &&
        typeof value.user_id === "number" &&
        (value.response_to === null || typeof value.response_to === "number") &&
        (value.version_of === null || typeof value.version_of === "number") &&
        typeof value.version === "number" &&
        typeof value.title === "string" &&
        typeof value.summary === "string" &&
        (isParsableArray(value.content) || isNonDynamicContent(value.content)) &&
        typeof value.create_time === "string"
    )
}

export function isPostForReviewArray(value: any): value is PostForReview[] {
    return (
        value &&
        Array.isArray(value) &&
        value.every(
            (item: any) =>
                isPostForReview(item)
        ) 
    )
}