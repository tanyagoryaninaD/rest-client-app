import admin from 'firebase-admin';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!privateKey) {
  throw new Error('FIREBASE_PRIVATE_KEY is missing in env');
}

const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });

export const adminAuth = getAuth(app);
export const adminAppDB = admin.firestore();
export const verifyIdToken = async (token: string) => {
  return adminAuth.verifyIdToken(token);
};
