/* Documentation Reference: https://nextjs.org/docs/app/building-your-application/authentication */

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// TODO determine the format types of a payload
export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('3d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });
    const cookie = (await cookies())
    cookie.set(
        'session',
        session,
        {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: 'lax',
        }
    );
    console.log("Cookie set:", cookie.get('session')?.value)
}

export async function getSession() {
    console.log("getSession called")
    const cookie = await cookies();
    const session = cookie.get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}