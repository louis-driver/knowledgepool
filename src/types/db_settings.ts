export interface IDBSettings {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
}

export interface ReturnError {
    error: string,
    returnedStatus: number
}

export function isReturnError(value: any): value is ReturnError {
    return (
        value && 
        typeof value.error === "string" &&
        typeof value.returnedStatus === "number"
    )
}

export const GetDBSettings =(): IDBSettings => {
    const env = process.env.NODE_ENV;

    if (env == 'development')
        return {
            host: process.env.DB_HOST_dev!,
            port: parseInt(process.env.DB_PORT_dev!),
            user: process.env.DB_USER_dev!,
            password: process.env.DB_PASSWORD_dev!,
            database: process.env.DB_NAME_dev!,
        }
    else //TODO: update environment variables with real variables on deployment
        return {
            host: process.env.DB_HOST!,
            port: parseInt(process.env.DB_PORT!),
            user: process.env.DB_USER!,
            password: process.env.DB_PASSWORD!,
            database: process.env.DB_NAME!,
        }
}