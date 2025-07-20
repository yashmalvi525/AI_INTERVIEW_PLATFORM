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

  export async function getCurrentUser() {
    const cookieStore = await cookies(); 
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return null;
    }

    try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie , true);
      const userRecord = await db.collection('users')
      .doc(decodedClaims.uid)
      .get();
      
      if(!userRecord.exists) {
        return null;
      }
      return {
        ...userRecord.data(),
        id: userRecord.id,
      } as User;
    } catch (error) {
      console.error("Error verifying session cookie", error);
      return null;
    }
  }

  export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
  }


  export async function getInterviewByUserId(userId: string) : Promise<Interview[] | null> {
 const Interview =await db
 .collection('interviews')
 .where('userId', '==', userId)
 .orderBy('createdAt', 'desc')
  .get()

  return Interview.docs.map(doc => ({ id: doc.id,
    ...doc.data() })) as Interview[] || null; 
  }


  export async function getLatestInterviews(params : GetLatestInterviewsParams) : Promise<Interview[] | null> {
    const { userId , limit =20  } = params;

    const Interview =await db
    .collection('interviews')
    .orderBy('createdAt', 'desc')
    .where('finalized', '==', true)
    .where('userId', '!=', userId)
    .limit(limit)
     .get()
   
     return Interview.docs.map(doc => ({ id: doc.id,
       ...doc.data() })) as Interview[] || null; 
     }
