import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { AUTH_SUCCESS_MESSAGES } from '@/constants/authMessages';
import { appDB, auth } from '@/lib/firebase';
import type { SignInSignUpValues } from '@/types/authForms';
import { Collections } from '@/types/enums/firebase';

import { handleAuthError } from '../handlers/authHandlers';

export const userRegister = async (data: SignInSignUpValues) => {
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
    await userLogin({ email, password });
  } catch (err) {
    handleAuthError(err);
  }
};

export const userLogin = async (data: SignInSignUpValues) => {
  const { email, password } = data;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    toast.success(`${AUTH_SUCCESS_MESSAGES.signIn} ${user.displayName}`);
  } catch (err) {
    handleAuthError(err);
  }
};
