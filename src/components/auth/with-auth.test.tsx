'use client';

import { render, screen } from '@testing-library/react';

import withAuth from './with-auth';

const mockUseIsLoggedIn = jest.fn();
jest.mock('@/hooks/use-is-logged-in', () => ({
  useIsLoggedIn: () => mockUseIsLoggedIn() as boolean,
}));

const mockRouterReplace = jest.fn();
jest.mock('@/i18n/navigation', () => ({
  useRouter: () => ({
    replace: mockRouterReplace,
  }),
}));

function MockComponent() {
  return <div>Protected Content</div>;
}

jest.mock('@/components/layout/loader/loader', () => {
  return function MockLoader() {
    return <div>Loading...</div>;
  };
});

describe('withAuth HOC', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when protecting a private route', () => {
    it('should render the component if the user is logged in', () => {
      mockUseIsLoggedIn.mockReturnValue(true);
      const ProtectedComponent = withAuth(MockComponent);

      render(<ProtectedComponent />);

      expect(screen.getByText('Protected Content')).toBeInTheDocument();

      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

      expect(mockRouterReplace).not.toHaveBeenCalled();
    });

    it('should render Loader and redirect if the user is not logged in', () => {
      mockUseIsLoggedIn.mockReturnValue(false);
      const ProtectedComponent = withAuth(MockComponent);

      render(<ProtectedComponent />);

      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      expect(mockRouterReplace).toHaveBeenCalledWith('/sign-in');
      expect(mockRouterReplace).toHaveBeenCalledTimes(1);
    });
  });

  describe('when protecting a non-private route', () => {
    it('should render the component if the user is NOT logged in', () => {
      mockUseIsLoggedIn.mockReturnValue(false);
      const PublicComponent = withAuth(MockComponent, {
        reverseCondition: true,
      });

      render(<PublicComponent />);

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(mockRouterReplace).not.toHaveBeenCalled();
    });

    it('should render Loader and redirect if the user IS logged in', () => {
      mockUseIsLoggedIn.mockReturnValue(true);
      const PublicComponent = withAuth(MockComponent, {
        reverseCondition: true,
      });

      render(<PublicComponent />);

      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      expect(mockRouterReplace).toHaveBeenCalledWith('/');
      expect(mockRouterReplace).toHaveBeenCalledTimes(1);
    });
  });
});
