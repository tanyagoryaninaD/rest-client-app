import { cookies } from 'next/headers';

import { adminAuth, verifyIdToken } from '@/lib/fireBaseAdmin';
import MainPageClientWrapper from '@/pages/main/mainClientPageWrapper';

export default async function MainPage() {
  const token: string | undefined = (await cookies()).get('token')?.value;

  if (!token) {
    return <MainPageClientWrapper currentUser="" isNewUser={false} />;
  }

  const decoded = await verifyIdToken(token);
  const user = await adminAuth.getUser(decoded.uid);
  const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

  return (
    <MainPageClientWrapper
      currentUser={user.displayName ?? user.email ?? decoded.uid}
      isNewUser={isNewUser}
    />
  );
}
