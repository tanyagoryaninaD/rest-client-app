import type { AppUser } from '@/types/userData';

import type { UserState } from './userSlicer';
import reducer, { clearUser, setUser } from './userSlicer';

describe('userSlice', () => {
  const initialState: UserState = { user: null, isValid: false };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setUser with a valid user', () => {
    const mockUser: AppUser = {
      displayName: 'Alex',
      isNewUser: false,
      expiresIn: Date.now() + 1000 * 60 * 60,
    };
    const nextState = reducer(initialState, setUser(mockUser));

    expect(nextState.user).toEqual(mockUser);
  });

  it('should handle setUser with null', () => {
    const prevState: UserState = {
      user: {
        displayName: 'Alex',
        isNewUser: true,
        expiresIn: Date.now() + 1000,
      },
      isValid: true,
    };

    const nextState = reducer(prevState, setUser(null));

    expect(nextState).toEqual({ user: null, isValid: false });
  });

  it('should handle clearUser', () => {
    const prevState: UserState = {
      user: {
        displayName: 'Alex',
        isNewUser: true,
        expiresIn: Date.now() + 1000,
      },
      isValid: true,
    };

    const nextState = reducer(prevState, clearUser());

    expect(nextState).toEqual({ user: null, isValid: false });
  });
});
