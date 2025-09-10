'use client';

import dynamic from 'next/dynamic';

import withAuth from '@/components/auth/with-auth';
import Loader from '@/components/layout/loader/loader';

const Client = dynamic(() => import('@/pages/client/client'), {
  ssr: false,
  loading: Loader,
});

export default withAuth(Client);
