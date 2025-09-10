import { useAppSelector } from '@/hooks/redux';
import { isTokenValid } from '@/utils/firebase/tokenValidation';

export function useIsLoggedIn() {
  const currentUserName = useAppSelector(
    (state) => state.user.user?.displayName
  );
  const tokenExpirationTime = useAppSelector(
    (state) => state.user.user?.expiresIn
  );
  const isLoggedIn =
    Boolean(currentUserName) && isTokenValid(tokenExpirationTime);

  return isLoggedIn;
}
