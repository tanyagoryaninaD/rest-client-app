import { render } from '@testing-library/react';

import { useAppDispatch } from '@/hooks/redux';
import { initAuthSubscriber } from '@/utils/firebase/initAuthSubscriber';
import AuthHandler from '@/utils/handlers/authHandler';

jest.mock('@/hooks/redux', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('@/utils/firebase/initAuthSubscriber', () => ({
  initAuthSubscriber: jest.fn(),
}));

describe('AuthHandler', () => {
  const mockDispatch = jest.fn();
  const mockUnsubscribe = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (initAuthSubscriber as jest.Mock).mockReturnValue(mockUnsubscribe);
  });

  it('should call initAuthSubscriber with dispatch on mount', () => {
    render(<AuthHandler />);
    expect(initAuthSubscriber).toHaveBeenCalledWith(mockDispatch);
  });

  it('should call unsubscribe on unmount', () => {
    const { unmount } = render(<AuthHandler />);
    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it('should render nothing', () => {
    const { container } = render(<AuthHandler />);
    expect(container).toBeEmptyDOMElement();
  });
});
