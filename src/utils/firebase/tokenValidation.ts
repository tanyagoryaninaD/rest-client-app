import { type User } from 'firebase/auth';

export const getExpirationTime = async (user: User | null) => {
  if (!user) {
    return 0;
  }
  const idToken = await user.getIdTokenResult();
  const expiresIn = new Date(idToken.expirationTime).getTime();
  return Math.floor((expiresIn - Date.now()) / 1000);
};

export const isTokenValid = (expiresIn?: number): boolean => {
  if (!expiresIn) {
    return false;
  }
  return expiresIn > Date.now();
};
