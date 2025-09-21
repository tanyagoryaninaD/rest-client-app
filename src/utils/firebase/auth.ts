import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { appDB, auth } from '@/lib/firebase';
import type { SignInSignUpValues } from '@/types/authForms';
import type { LogoutReason } from '@/types/enums/firebase';
import { Collections } from '@/types/enums/firebase';

import { handleAuthError } from '../handlers/authErrorsHandler';
import { mapUserFirebase } from './mapUserFirebase';

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

    return await mapUserFirebase(user);
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
    return await mapUserFirebase(user);
  } catch (err) {
    handleAuthError(err, t);
    return null;
  }
};

export const userLogout = async (
  t: (key: string) => string,
  reason: LogoutReason = 'manual'
) => {
  try {
    await signOut(auth);
    if (reason === 'expired') {
      toast.success(t('auth.sign_out_token'));
    } else {
      toast.success(t('auth.sign_out'));
    }
    document.cookie = 'token=; path=/; max-age=0';
  } catch (err) {
    handleAuthError(err, t);
  }
};
