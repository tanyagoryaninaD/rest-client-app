'use client';

import dynamic from 'next/dynamic';

import Loader from '@/components/layout/loader/loader';

const SignIn = dynamic(() => import('@/pages-components/sign-in/sign-in'), {
  ssr: false,
  loading: Loader,
});

export default function SignInPage() {
  return <SignIn />;
}
