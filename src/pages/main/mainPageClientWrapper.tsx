'use client';

import dynamic from 'next/dynamic';

import Loading from '@/components/layout/loader/loader';

const HomePageClient = dynamic(() => import('@/pages/main/mainPageClient'), {
  ssr: false,
  loading: () => <Loading />,
});

interface HomePageClientWrapperProps {
  currentUser: string;
  isNewUser: boolean;
}

export default function MainPageClientWrapper({
  currentUser,
  isNewUser,
}: HomePageClientWrapperProps) {
  return <HomePageClient currentUser={currentUser} isNewUser={isNewUser} />;
}
