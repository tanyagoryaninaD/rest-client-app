import { cookies } from 'next/headers';

import { adminAuth, verifyIdToken } from '@/lib/fireBaseAdmin';
import HomePageClient from '@/pages/main/mainClient';

export default async function HistoryPage() {
  const token: string | undefined = (await cookies()).get('token')?.value;

  if (!token) {
    return <HomePageClient currentUser="" isNewUser={false} />;
  }

  const decoded = await verifyIdToken(token);
  const user = await adminAuth.getUser(decoded.uid);
  const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

  return (
    <HomePageClient
      currentUser={user.displayName ?? user.email ?? decoded.uid}
      isNewUser={isNewUser}
    />
  );
}
