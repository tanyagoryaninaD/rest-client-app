'use client';

import dynamic from 'next/dynamic';

import withAuth from '@/components/auth/with-auth';
import Loader from '@/components/layout/loader/loader';

const Variables = dynamic(() => import('@/pages/variables/variables'), {
  ssr: false,
  loading: Loader,
});

export default withAuth(Variables);
