export interface ErrorMessage {
    error: string,
    returnedStatus: number
}

export function isErrorMessage(value: any): value is ErrorMessage {
    return (
        value &&
        typeof value.error === "string" &&
        typeof value.returnedStatus === "number"
    )
}