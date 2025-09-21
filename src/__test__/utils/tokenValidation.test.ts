import type { User } from 'firebase/auth';

import {
  getExpirationTime,
  isTokenValid,
} from '@/utils/firebase/tokenValidation';

describe('getExpirationTime', () => {
  it('should return timestamp', async () => {
    const mockUser: User = {
      getIdTokenResult: jest.fn().mockResolvedValue({
        expirationTime: '2050-01-01T00:00:00Z',
      }),
    } as unknown as User;

    const result = await getExpirationTime(mockUser);
    expect(result).toBeGreaterThan(0);
  });

  it('should return 0 when user is null', async () => {
    const result = await getExpirationTime(null);
    expect(result).toBe(0);
  });
});

describe('isTokenValid', () => {
  it('should return false, if expirationTime is not passed', () => {
    expect(isTokenValid()).toBe(false);
  });

  it('should return false, if the token has expired', () => {
    const pastTime = -1000;
    expect(isTokenValid(pastTime)).toBe(false);
  });

  it('should return false, if the token is valid', () => {
    const futureTime = Date.now() + 1000 * 60;
    expect(isTokenValid(futureTime)).toBe(true);
  });
});
