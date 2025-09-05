import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { appDB, auth } from '@/lib/firebase';
import type { SignInSignUpValues } from '@/types/authForms';
import { Collections } from '@/types/enums/firebase';

import { handleAuthError } from '../handlers/authHandlers';

export const userRegister = async (
  data: SignInSignUpValues,
  t: (key: string) => string
) => {
  const { name, email, password } = data;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(appDB, Collections.Users, user.uid), {
      name,
      email,
    });

    await updateProfile(user, { displayName: name });

    await userLogin({ email, password }, t);
  } catch (err) {
    handleAuthError(err, t);
  }
};

export const userLogin = async (
  data: SignInSignUpValues,
  t: (key: string) => string
) => {
  const { email, password } = data;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    toast.success(`${t('toast.auth.welcome')} ${user.displayName}`);
  } catch (err) {
    handleAuthError(err, t);
  }
};
