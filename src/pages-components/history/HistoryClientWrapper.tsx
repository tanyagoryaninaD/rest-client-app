'use client';

import dynamic from 'next/dynamic';

import Loading from '@/components/layout/loader/loader';
import type { HistoryCollection } from '@/types/userData';

const HistoryClient = dynamic(
  () => import('@/pages-components/history/HistoryClient'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

interface HistoryClientWrapperProps {
  requests: HistoryCollection[];
}

export default function HistoryClientWrapper({
  requests,
}: HistoryClientWrapperProps) {
  return <HistoryClient requests={requests} />;
}
