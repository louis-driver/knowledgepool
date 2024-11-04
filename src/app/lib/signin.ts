import { z } from 'zod'
 
// Use same error message to not reveal any information to bad actors testing credentials
export const SigninFormSchema = z.object({
    username: z
        .string()
        .min(2, { message: 'Username or password is incorrect.' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Username or password is incorrect.' })
        .regex(/[a-zA-Z]/, { message: 'Username or password is incorrect.' })
        .regex(/[0-9]/, { message: 'Username or password is incorrect.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Username or password is incorrect.',
        })
        .trim()
})
 
export type FormState =
  | {
      errors?: {
        username?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
