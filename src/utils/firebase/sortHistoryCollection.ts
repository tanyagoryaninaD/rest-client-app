import type { HistoryCollection } from '@/types/userData';

export function sortHistoryCollection(collection: HistoryCollection[]) {
  return [...collection].sort(
    (a, b) => a.requestTimestamp - b.requestTimestamp
  );
}
