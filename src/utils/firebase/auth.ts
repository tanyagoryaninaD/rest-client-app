import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { appDB, auth } from '@/lib/firebase';
import type { AppDispatch } from '@/store';
import { clearUser, setUser } from '@/store/slicers/userSlicer';
import type { SignInSignUpValues } from '@/types/authForms';
import { Collections } from '@/types/enums/firebase';

import { handleAuthError } from '../handlers/authHandlers';

export const userRegister = async (
  data: SignInSignUpValues,
  t: (key: string) => string,
  dispatch: AppDispatch
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
    dispatch(setUser({ displayName: user.displayName, isNewUser: true }));
  } catch (err) {
    handleAuthError(err, t);
  }
};

export const userLogin = async (
  data: SignInSignUpValues,
  t: (key: string) => string,
  dispatch: AppDispatch
) => {
  const { email, password } = data;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const appUser = { displayName: user.displayName, isNewUser: false };
    dispatch(setUser(appUser));
    toast.success(`${t('toast.auth.welcome')} ${user.displayName}`);
    return appUser;
  } catch (err) {
    handleAuthError(err, t);
  }
};

export const userLogout = async (
  t: (key: string) => string,
  dispatch: AppDispatch
) => {
  try {
    await signOut(auth);
    toast.success(t('auth.sign_out'));

    dispatch(clearUser());
  } catch (err) {
    handleAuthError(err, t);
  }
};
