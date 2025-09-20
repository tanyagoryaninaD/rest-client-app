import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { userLogin, userLogout, userRegister } from '@/utils/firebase/auth';
import { mapUserFirebase } from '@/utils/firebase/mapUserFirebase';
import { handleAuthError } from '@/utils/handlers/authErrorsHandler';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
}));
jest.mock('@/lib/firebase', () => ({
  auth: {},
  appDB: {},
}));
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock('@/utils/handlers/authErrorsHandler', () => ({
  handleAuthError: jest.fn(),
}));
jest.mock('@/utils/firebase/mapUserFirebase', () => ({
  mapUserFirebase: jest.fn(),
}));

describe('authActions', () => {
  const t = jest.fn((key: string) => `translated-${key}`);
  const mocUser = { uid: 'user123', displayName: 'Alex' };
  const fakeUserCredential = { user: mocUser };

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });
  });

  describe('userRegister', () => {
    it('should register user, save in firestore, update profile, and map user', async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(
        fakeUserCredential
      );
      (setDoc as jest.Mock).mockResolvedValue(undefined);
      (updateProfile as jest.Mock).mockResolvedValue(undefined);
      (mapUserFirebase as jest.Mock).mockResolvedValue({ userId: 'user123' });

      const result = await userRegister(
        { name: 'Alex', email: 'alex@test.com', password: 'qwQW12!@' },
        t
      );

      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(setDoc).toHaveBeenCalled();
      expect(updateProfile).toHaveBeenCalledWith(mocUser, {
        displayName: 'Alex',
      });
      expect(mapUserFirebase).toHaveBeenCalledWith(mocUser);
      expect(result).toEqual({ userId: 'user123' });
    });

    it('should call handleAuthError', async () => {
      const error = new Error('Registration failed');
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

      await userRegister(
        { name: 'John', email: 'john@test.com', password: 'qwQW12!@' },
        t
      );

      expect(handleAuthError).toHaveBeenCalledWith(error, t);
    });
  });

  describe('userLogin', () => {
    it('should login user, show toast, and map user', async () => {
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
        fakeUserCredential
      );
      (mapUserFirebase as jest.Mock).mockResolvedValue({ userId: 'user321' });

      const result = await userLogin(
        { email: 'alex@test.com', password: 'qwQW12!@' },
        t
      );

      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        `translated-toast.auth.welcome ${mocUser.displayName}`
      );
      expect(mapUserFirebase).toHaveBeenCalledWith(mocUser);
      expect(result).toEqual({ userId: 'user321' });
    });

    it('should call handleAuthError and return null', async () => {
      const error = new Error('Login failed');
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

      const result = await userLogin(
        { email: 'alex@test.com', password: 'qwQW12!@' },
        t
      );

      expect(handleAuthError).toHaveBeenCalledWith(error, t);
      expect(result).toBeNull();
    });
  });

  describe('userLogout', () => {
    it('should sign out and clear cookie (manual)', async () => {
      (signOut as jest.Mock).mockResolvedValue(undefined);

      await userLogout(t, 'manual');

      expect(signOut).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('translated-auth.sign_out');
      expect(document.cookie).toBe('token=; path=/; max-age=0');
    });

    it('should sign out and show expired message', async () => {
      (signOut as jest.Mock).mockResolvedValue(undefined);

      await userLogout(t, 'expired');

      expect(toast.success).toHaveBeenCalledWith(
        'translated-auth.sign_out_token'
      );
    });

    it('should call handleAuthError', async () => {
      const error = new Error('Logout failed');
      (signOut as jest.Mock).mockRejectedValue(error);

      await userLogout(t, 'manual');

      expect(handleAuthError).toHaveBeenCalledWith(error, t);
    });
  });
});
