import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';

import { AUTH_ERRORS_MESSAGES } from '@/constants/authMessages';

export const handleAuthError = (err: unknown) => {
  if (err instanceof FirebaseError) {
    const message = AUTH_ERRORS_MESSAGES[err.code] ?? err.message;
    toast.error(message);
  } else {
    toast.error('Unknown error');
  }
};
