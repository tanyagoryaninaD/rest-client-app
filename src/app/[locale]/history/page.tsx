import { cookies } from 'next/headers';

import { redirect } from '@/i18n/navigation';
import { verifyIdToken } from '@/lib/fireBaseAdmin';
import HistoryClient from '@/pages/history/HistoryClient';
import type { HistoryCollection } from '@/types/userData';
import { getHistory } from '@/utils/firebase/collections';

export default async function HistoryPage() {
  const token: string | undefined = (await cookies()).get('token')?.value;
  const locale = (await cookies()).get('NEXT_LOCALE')?.value ?? 'en';

  if (!token) {
    redirect({ href: '/', locale });
    return;
  }

  const decoded = await verifyIdToken(token);
  const userId = decoded.uid;

  let requests: HistoryCollection[] = [];
  try {
    requests = await getHistory(userId);
  } catch {
    requests = [];
  }

  return <HistoryClient requests={requests} />;
}
