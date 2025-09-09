'use client';

import dynamic from 'next/dynamic';

import withAuth from '@/components/auth/with-auth';
import Loader from '@/components/layout/loader/loader';

const SignUp = dynamic(() => import('@/pages/sign-up/sign-up'), {
  ssr: false,
  loading: Loader,
});

export default withAuth(SignUp, { reverseCondition: true });
