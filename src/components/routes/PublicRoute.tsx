'use client';

import { useEffect } from 'react';

import { useAppSelector } from '@/hooks/redux';
import { useRouter } from '@/i18n/navigation';

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isValid } = useAppSelector((store) => store.user);

  useEffect(() => {
    if (isValid && user) {
      router.replace('/');
    }
  }, [user, isValid, router]);

  return <>{!user && children}</>;
}
