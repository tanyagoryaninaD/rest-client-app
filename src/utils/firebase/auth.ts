import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import type { useRouter } from '@/i18n/navigation';
import { appDB, auth } from '@/lib/firebase';
import type { AppDispatch } from '@/store';
import { clearUser, setUser } from '@/store/slicers/userSlicer';
import type { SignInSignUpValues } from '@/types/authForms';
import { Collections } from '@/types/enums/firebase';

import { handleAuthError } from '../handlers/authErrorsHandler';
import { getExpirationTime } from './tokenValidation';

export const userRegister = async (
  data: SignInSignUpValues,
  t: (key: string) => string,
  dispatch: AppDispatch,
  router: ReturnType<typeof useRouter>
) => {
  const { name, email, password } = data;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const expiresIn = await getExpirationTime(user);

    await setDoc(doc(appDB, Collections.Users, user.uid), {
      name,
      email,
    });

    await updateProfile(user, { displayName: name });
    dispatch(
      setUser({ displayName: user.displayName, isNewUser: true, expiresIn })
    );
    router.push('/');
  } catch (err) {
    handleAuthError(err, t);
  }
};

export const userLogin = async (
  data: SignInSignUpValues,
  t: (key: string) => string,
  dispatch: AppDispatch,
  router: ReturnType<typeof useRouter>
) => {
  const { email, password } = data;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const expiresIn = await getExpirationTime(user);
    const appUser = {
      displayName: user.displayName,
      isNewUser: false,
      expiresIn,
    };
    dispatch(setUser(appUser));
    toast.success(`${t('toast.auth.welcome')} ${user.displayName}`);
    router.push('/');
  } catch (err) {
    handleAuthError(err, t);
  }
};

export const userLogout = async (
  t: (key: string) => string,
  dispatch: AppDispatch,
  router: ReturnType<typeof useRouter>
) => {
  try {
    await signOut(auth);
    toast.success(t('auth.sign_out'));
    dispatch(clearUser());
    router.push('/');
  } catch (err) {
    handleAuthError(err, t);
  }
};
