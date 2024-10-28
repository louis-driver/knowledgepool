export interface FormResponse {
    message: string,
    received: any,
    sqlResponse: any,
    status: boolean
}

export interface SignupForm {
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string
}