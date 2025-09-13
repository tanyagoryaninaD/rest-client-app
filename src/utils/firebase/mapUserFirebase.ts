import type { User } from 'firebase/auth';

import { getExpirationTime } from './tokenValidation';

export const mapUserFirebase = async (user: User, isNewUser: boolean) => {
  const expiresIn = await getExpirationTime(user);
  return {
    displayName: user.displayName,
    isNewUser,
    expiresIn,
  };
};
