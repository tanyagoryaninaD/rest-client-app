import { useAppSelector } from '@/hooks/redux';
import { isTokenValid } from '@/utils/firebase/tokenValidation';

export function useUserLoggedState() {
  const currentUserName = useAppSelector(
    (state) => state.user.user?.displayName
  );
  const tokenExpirationTime = useAppSelector(
    (state) => state.user.user?.expiresIn
  );
  const isLoggedIn =
    Boolean(currentUserName) && isTokenValid(tokenExpirationTime);
  const isLoading = useAppSelector((state) => state.user.loading);

  return { isLoggedIn, isLoading };
}
