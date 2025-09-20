import { renderHook } from '@testing-library/react';

import { useAppSelector } from '@/hooks/redux';
import { useUserLoggedState } from '@/hooks/use-user-logged-state';
import { isTokenValid } from '@/utils/firebase/tokenValidation';

jest.mock('@/hooks/redux', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/utils/firebase/tokenValidation', () => ({
  isTokenValid: jest.fn(),
}));

const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>;
const mockedIsTokenValid = isTokenValid as jest.MockedFunction<
  typeof isTokenValid
>;

describe('useUserLoggedState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true if user name and token are valid', () => {
    mockedUseAppSelector
      .mockReturnValueOnce('Alex')
      .mockReturnValueOnce(500)
      .mockReturnValueOnce(false);

    mockedIsTokenValid.mockReturnValue(true);

    const { result } = renderHook(() => useUserLoggedState());

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return false if if there is no name', () => {
    mockedUseAppSelector
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(500)
      .mockReturnValueOnce(true);

    mockedIsTokenValid.mockReturnValue(true);

    const { result } = renderHook(() => useUserLoggedState());

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.isLoading).toBe(true);
  });

  it('should return false if token invalid', () => {
    mockedUseAppSelector
      .mockReturnValueOnce('Alex')
      .mockReturnValueOnce(500)
      .mockReturnValueOnce(false);

    mockedIsTokenValid.mockReturnValue(false);

    const { result } = renderHook(() => useUserLoggedState());

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });
});
