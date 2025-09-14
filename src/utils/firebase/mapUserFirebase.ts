import type { User } from 'firebase/auth';

import type { SetToken } from '@/types/firebase';

import { getExpirationTime } from './tokenValidation';

export const mapUserFirebase = async (user: User, isNewUser: boolean) => {
  const expiresIn = await getExpirationTime(user);
  const userId = user.uid;
  const token = await user.getIdToken();

  const response = await fetch('/api/set-token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, expiresIn }),
  });

  const data = (await response.json()) as SetToken;

  document.cookie = `token=${data.token}; path=/; max-age=${data.expiresIn}`;
  return {
    userId,
    displayName: user.displayName,
    isNewUser,
    expiresIn,
  };
};
