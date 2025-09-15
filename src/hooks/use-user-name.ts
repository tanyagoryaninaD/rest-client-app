import { useAppSelector } from '@/hooks/redux';

export function useUserName() {
  const userName = useAppSelector((state) => state.user.user?.displayName);

  return userName;
}
