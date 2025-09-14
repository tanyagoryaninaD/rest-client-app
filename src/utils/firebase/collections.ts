// import type { QueryDocumentSnapshot } from 'firebase/firestore';
// import { collection, getDocs } from 'firebase/firestore';

// import { appDB } from '@/lib/firebase';
// import { Collections } from '@/types/enums/firebase';
// import type { FirestoreHistoryDoc } from '@/types/userData';

// export async function getHistory(userId: string) {
//   const requestsRef = collection(
//     appDB,
//     Collections.Users,
//     userId,
//     Collections.Requests
//   );
//   const snapshot = await getDocs(requestsRef);

//   return snapshot.docs.map(
//     (item: QueryDocumentSnapshot<FirestoreHistoryDoc>) => {
//       const field = item.data();
//       return {
//         id: item.id,
//         requestDuration: field.requestDuration ?? 0,
//         responseStatusCode: field.responseStatusCode ?? 0,
//         requestTimestamp: field.requestTimestamp ?? 0,
//         requestMethod: field.requestMethod ?? '',
//         requestSize: field.requestSize ?? 0,
//         responseSize: field.responseSize ?? 0,
//         errorDetails: field.errorDetails ?? '',
//         endpointUrl: field.endpointUrl ?? '',
//       };
//     }
//   );
// }

import { adminAppDB } from '@/lib/fireBaseAdmin';
import { Collections } from '@/types/enums/firebase';
import type { FirestoreHistoryDoc, HistoryCollection } from '@/types/userData';

export async function getHistory(userId: string): Promise<HistoryCollection[]> {
  const snapshot = await adminAppDB
    .collection(Collections.Users)
    .doc(userId)
    .collection(Collections.Requests)
    .orderBy('requestTimestamp', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const field = doc.data() as FirestoreHistoryDoc;
    return {
      id: doc.id,
      requestDuration: field.requestDuration ?? 0,
      responseStatusCode: field.responseStatusCode ?? 0,
      requestTimestamp: field.requestTimestamp ?? 0,
      requestMethod: field.requestMethod ?? '',
      requestSize: field.requestSize ?? 0,
      responseSize: field.responseSize ?? 0,
      errorDetails: field.errorDetails ?? '',
      endpointUrl: field.endpointUrl ?? '',
    };
  });
}
