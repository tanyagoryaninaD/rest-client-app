import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/lib/firebase';
import type { AppDispatch } from '@/store';
import { clearUser, setUser } from '@/store/slicers/userSlicer';

import { mapUserFirebase } from '../firebase/mapUserFirebase';

export const initAuthSubscriber = (dispatch: AppDispatch) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const fetchUser = async () => {
      if (user) {
        const mappedUser = await mapUserFirebase(user, false);
        dispatch(setUser(mappedUser));
      } else {
        dispatch(clearUser());
      }
    };
    void fetchUser();
  });

  return unsubscribe;
};
