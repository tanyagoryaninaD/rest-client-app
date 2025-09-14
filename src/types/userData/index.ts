export interface AppUser {
  userId: string;
  displayName: string | null;
  isNewUser: boolean;
  expiresIn: number;
}

export interface HistoryCollection {
  id: string;
  requestDuration: number;
  responseStatusCode: number;
  requestTimestamp: number;
  requestMethod: string;
  requestSize: number;
  responseSize: number;
  errorDetails: string;
  endpointUrl: string;
}

export type FirestoreHistoryDoc = Partial<Omit<HistoryCollection, 'id'>>;
