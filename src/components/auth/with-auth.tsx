'use client';

import type { ComponentType } from 'react';
import { useEffect } from 'react';

import Loader from '@/components/layout/loader/loader';
import { useIsLoggedIn } from '@/hooks/use-is-logged-in';
import { useRouter } from '@/i18n/navigation';

export default function withAuth(
  WrappedComponent: ComponentType,
  { reverseCondition = false } = {}
) {
  return function WithAuth() {
    const router = useRouter();
    const isLoggedIn = useIsLoggedIn();

    const redirectCondition = reverseCondition ? !isLoggedIn : isLoggedIn;

    useEffect(() => {
      if (!redirectCondition) {
        router.replace(reverseCondition ? '/' : '/sign-in');
      }
    }, [redirectCondition, router]);

    return redirectCondition ? <WrappedComponent /> : <Loader />;
  };
}
