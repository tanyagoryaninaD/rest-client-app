'use client';

import dynamic from 'next/dynamic';

import withAuth from '@/components/auth/with-auth';
import Loader from '@/components/layout/loader/loader';

const SignIn = dynamic(() => import('@/pages/sign-in/sign-in'), {
  ssr: false,
  loading: Loader,
});

export default withAuth(SignIn, { reverseCondition: true });
