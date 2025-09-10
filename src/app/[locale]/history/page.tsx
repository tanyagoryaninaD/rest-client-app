'use client';

import dynamic from 'next/dynamic';

import withAuth from '@/components/auth/with-auth';
import Loader from '@/components/layout/loader/loader';

const History = dynamic(() => import('@/pages/history/history'), {
  ssr: false,
  loading: Loader,
});

export default withAuth(History);
