import type { User } from 'firebase/auth';

import { getExpirationTime } from './tokenValidation';

export const mapUserFirebase = async (user: User) => {
  const expiresIn = await getExpirationTime(user);
  const userId = user.uid;
  const token = await user.getIdToken();
  const maxAge = Math.floor((expiresIn - Date.now()) / 1000);
  document.cookie = `token=${token}; path=/; max-age=${maxAge}`;
  return {
    userId,
    displayName: user.displayName,
    expiresIn,
  };
};
