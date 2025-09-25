'use server';

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const OneWeek = 60 * 60 * 24 * 7 * 1000;


export async function signUp(params: SignUpParams) {
    const { uid, name, email} = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists) {
            return {
                success: false,
                message: 'User already exists. Please sign in instead.',
            }
        }

        await db.collection('users').doc(uid).set({
            name,
            email,
        });

    }catch(e: any) {
        console.error('Error during sign up:', e);

        if(e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'Email already in use',
            }
        }

        return {
            success: false,
            message: 'Failed to create an acount'
        }
            
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try{
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord) {
            return {
                success: false,
                message: 'User does not exist. Create an account instead'
            }
        }

        await setSessionCookie(idToken);
    }
    catch(e) {
        console.error('Error during sign in:', e);
        return {
            success: false,
            message: 'Failed to sign in'
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn: OneWeek});

    cookieStore.set('session', sessionCookie, {
        maxAge: OneWeek,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })
}