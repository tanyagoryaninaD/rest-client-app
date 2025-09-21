'use client';

import dynamic from 'next/dynamic';

import Loader from '@/components/layout/loader/loader';

const Variables = dynamic(
  () => import('@/pages-components/variables/variables'),
  {
    ssr: false,
    loading: Loader,
  }
);

export default function VariablesPage() {
  return <Variables />;
}
