import type { User } from 'firebase/auth';

import { mapUserFirebase } from '@/utils/firebase/mapUserFirebase';
import { getExpirationTime } from '@/utils/firebase/tokenValidation';

jest.mock('@/utils/firebase/tokenValidation', () => ({
  getExpirationTime: jest.fn(),
}));

describe('mapUserFirebase', () => {
  let mockUser: Partial<User>;

  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });

    mockUser = {
      uid: 'user123',
      displayName: 'Test User',
      getIdToken: jest.fn(),
    };
  });

  it('should map user and set cookie', async () => {
    const fakeToken = 'token123';
    const fakeExpiresIn = Date.now() + 3600 * 1000;

    (getExpirationTime as jest.Mock).mockResolvedValue(fakeExpiresIn);
    (mockUser.getIdToken as jest.Mock).mockResolvedValue(fakeToken);

    const result = await mapUserFirebase(mockUser as User);

    const expectedMaxAge = Math.floor((fakeExpiresIn - Date.now()) / 1000);

    expect(result).toEqual({
      userId: mockUser.uid,
      displayName: mockUser.displayName,
      expiresIn: fakeExpiresIn,
    });

    expect(document.cookie).toContain(`token=${fakeToken}`);
    expect(document.cookie).toContain(`max-age=${expectedMaxAge}`);
  });
});
