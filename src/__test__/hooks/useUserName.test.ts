import { renderHook } from '@testing-library/react';

import { useAppSelector } from '@/hooks/redux';
import { useUserName } from '@/hooks/use-user-name';

jest.mock('@/hooks/redux', () => ({
  useAppSelector: jest.fn(),
}));

const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>;

describe('useUserName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user name', () => {
    mockedUseAppSelector.mockReturnValueOnce('Alex');

    const { result } = renderHook(() => useUserName());

    expect(result.current).toBe('Alex');
  });

  it('should return null if there is no name', () => {
    mockedUseAppSelector.mockReturnValueOnce(null);

    const { result } = renderHook(() => useUserName());

    expect(result.current).toBeNull();
  });
});
