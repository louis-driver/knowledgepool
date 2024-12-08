import { isNonDynamicContent, isParsableArray, NonDynamicContent, ParsableHTMLElement } from "./parsedContent"

export interface PostSubmission {
    user_id: number,
    response_to: number | null,
    version_of: number | null,
    version: number,
    title: string,
    summary: string,
    content: ParsableHTMLElement[] | NonDynamicContent
}

export interface PostFormSubmission {
    title: FormDataEntryValue,
    summary: FormDataEntryValue,
    content: FormDataEntryValue,
    resources: FormDataEntryValue
}

export interface PostForDisplay {
    post_id: number,
    username: string,
    response_to: number | null,
    title: string,
    summary: string,
    content: ParsableHTMLElement[] | NonDynamicContent,
    create_time: string
}

export function isPostForDisplay(value: any): value is PostForDisplay {
    return (
        value &&
        typeof value.post_id === "number" &&
        typeof value.username === "string" &&
        (value.response_to === null || typeof value.response_to === "number") &&
        typeof value.title === "string" &&
        typeof value.summary === "string" &&
        (isParsableArray(value.content) || isNonDynamicContent(value.content)) &&
        typeof value.create_time === "string"
    );
}