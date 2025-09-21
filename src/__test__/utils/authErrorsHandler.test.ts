import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';

import { AUTH_ERRORS_MESSAGES } from '@/constants/authMessages';
import { handleAuthError } from '@/utils/handlers/authErrorsHandler';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('handleAuthError', () => {
  const t = jest.fn((key: string) => `translated-${key}`);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show translated message for correct FirebaseError code', () => {
    const err = new FirebaseError('auth/wrong-password', 'Default message');
    AUTH_ERRORS_MESSAGES['auth/wrong-password'] = 'authErrors.wrongPassword';

    handleAuthError(err, t);

    expect(t).toHaveBeenCalledWith('authErrors.wrongPassword');
    expect(toast.error).toHaveBeenCalledWith(
      'translated-authErrors.wrongPassword'
    );
  });

  it('should show default message for incorrect  FirebaseError code', () => {
    const err = new FirebaseError('auth/unknown-code', 'Unknown message');

    handleAuthError(err, t);

    expect(toast.error).toHaveBeenCalledWith('Unknown message');
  });

  it('should show unknown error for not FirebaseError', () => {
    const err = new Error('Some random error');

    handleAuthError(err, t);

    expect(t).toHaveBeenCalledWith('toast.authErrors.unknownError');
    expect(toast.error).toHaveBeenCalledWith(
      'translated-toast.authErrors.unknownError'
    );
  });
});
