'use client';

import dynamic from 'next/dynamic';

import Loader from '@/components/layout/loader/loader';

const SignUp = dynamic(() => import('@/pages-components/sign-up/sign-up'), {
  ssr: false,
  loading: () => <Loader />,
});

export default function SignUpPage() {
  return <SignUp />;
}
