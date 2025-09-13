'use client';

import type { ComponentType } from 'react';
import { useEffect } from 'react';

import Loader from '@/components/layout/loader/loader';
import { useUserLoggedState } from '@/hooks/use-user-logged-state';
import { useRouter } from '@/i18n/navigation';

export default function withAuth(
  WrappedComponent: ComponentType,
  { reverseCondition = false } = {}
) {
  return function WithAuth() {
    const router = useRouter();
    const { isLoggedIn, isLoading } = useUserLoggedState();

    const needRedirect = reverseCondition ? isLoggedIn : !isLoggedIn;

    useEffect(() => {
      if (needRedirect && !isLoading) {
        router.replace(reverseCondition ? '/' : '/sign-in');
      }
    }, [needRedirect, router, isLoading]);

    if (isLoading) {
      return <Loader />;
    }

    return needRedirect ? <Loader /> : <WrappedComponent />;
  };
}
