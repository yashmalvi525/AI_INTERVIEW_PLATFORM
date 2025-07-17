'use server';

import { db, auth } from '@/firebase/admin';
import { cookies } from 'next/headers';

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please log in.",
      };
    }

    await db.collection('users').doc(uid).set({
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "User account created successfully.Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating a user", error);

    if (error.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: "Email already exists. Please use a different email.",
      };
    }

    return {
      success: false,
      message: "Failed to create an account. Please try again later.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Please sign up first.",
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: "User signed in successfully.",
    };
  } catch (error: any) {
    console.error("Error signing in", error);
    return {
      success: false,
      message: "Failed to sign in. Please check your credentials and try again.",
    };
  }
}

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies(); // ✅ await added
  
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: ONE_WEEK * 1000,
    });
  
    cookieStore.set('session', sessionCookie, {
      maxAge: ONE_WEEK * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });
  }
  

