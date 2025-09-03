import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { appDB, auth } from '@/lib/firebase';
import { Collections } from '@/types/firebase';
import type { SingInSingUpValues } from '@/types/userData/singUpData';

export const userRegistr = async (data: SingInSingUpValues) => {
  const { name, age, email, password } = data;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await updateProfile(user, { displayName: name });
    await setDoc(doc(appDB, Collections.Users, user.uid), {
      name,
      age,
      email,
    });
    // console.log('User was created', user.uid);
    await userLogin({ email, password });
  } catch (err) {
    if (err instanceof Error) {
      // console.error('Registration error:', err.message);
    }
  }
};

export const userLogin = async (data: SingInSingUpValues) => {
  const { email, password } = data;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    // console.log('User was logined', user.displayName);
  } catch (err) {
    if (err instanceof Error) {
      // console.error('Login error:', err.message);
    }
  }
};
