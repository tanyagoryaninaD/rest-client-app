import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';

import { AUTH_ERRORS_MESSAGES } from '@/constants/authMessages';

export const handleAuthError = (err: unknown, t: (key: string) => string) => {
  if (err instanceof FirebaseError) {
    const errorKey = AUTH_ERRORS_MESSAGES[err.code];
    const message = errorKey ? t(errorKey) : err.message;
    toast.error(message);
  } else {
    toast.error(t('toast.authErrors.unknownError'));
  }
};
