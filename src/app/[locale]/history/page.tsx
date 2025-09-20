import { cookies } from 'next/headers';

import { verifyIdToken } from '@/lib/fireBaseAdmin';
import HistoryClientWrapper from '@/pages-components/history/HistoryClientWrapper';
import type { HistoryCollection } from '@/types/userData';
import { getHistory } from '@/utils/firebase/collections';

export default async function HistoryPage() {
  const token: string | undefined = (await cookies()).get('token')?.value;

  if (!token) {
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

  return <HistoryClientWrapper requests={requests} />;
}
