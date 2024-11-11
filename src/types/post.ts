export interface PostSubmission {
    user_id: number,
    response_to: number | null,
    version_of: number | null,
    version: number,
    title: string,
    summary: string,
    content: any
}

export interface PostFormSubmission {
    title: FormDataEntryValue,
    summary: FormDataEntryValue,
    content: FormDataEntryValue,
    resources: FormDataEntryValue
}