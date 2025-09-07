import type { AppUser } from '@/types/userData';

import reducer, { clearUser, setUser } from './userSlicer';

describe('userSlice', () => {
  const initialState = { user: null };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setUser with a valid user', () => {
    const mockUser: AppUser = { displayName: 'Alex', isNewUser: false };
    const nextState = reducer(initialState, setUser(mockUser));

    expect(nextState.user).toEqual(mockUser);
  });

  it('should handle setUser with null', () => {
    const prevState = { user: { displayName: 'Alex', isNewUser: true } };
    const nextState = reducer(prevState, setUser(null));

    expect(nextState.user).toBeNull();
  });

  it('should handle clearUser', () => {
    const prevState = { user: { displayName: 'Alex', isNewUser: true } };
    const nextState = reducer(prevState, clearUser());

    expect(nextState.user).toBeNull();
  });
});
