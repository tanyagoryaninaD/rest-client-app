import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { AUTH_LINKS } from '@/constants/links';
import type { UserState } from '@/store/slicers/userSlicer';
import userReducer from '@/store/slicers/userSlicer';
import { userLogout } from '@/utils/firebase/auth';

import AuthPanel from './auth-panel';

jest.mock('@/utils/firebase/auth', () => ({
  userLogout: jest.fn(),
}));

jest.mock('@/i18n/navigation', () => ({
  Link: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{props.children}</a>
  ),
  usePathname: () => '/',
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (msg: string) => msg,
}));

const renderAuthPanel = (preloadedState: UserState) => {
  const store = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: preloadedState },
  });

  return render(
    <Provider store={store}>
      <AuthPanel isSidebarOpen={false} closeSidebar={() => undefined} />
    </Provider>
  );
};

describe('AuthPanel', () => {
  it('should render Sign Out button for authorized user and call userLogout on click', async () => {
    renderAuthPanel({
      user: {
        userId: 'user1',
        displayName: 'Alex',
        expiresIn: Date.now() + 1000,
      },
      isValid: true,
      loading: false,
    });

    const signOutButton = screen.getByText(/sign-out/i).closest('button');
    expect(signOutButton).toBeInTheDocument();
    if (signOutButton) {
      await userEvent.click(signOutButton);
    }

    await waitFor(() => {
      expect(userLogout).toHaveBeenCalled();
    });
  });

  it('should render Sign In / Sign Up links for unauthorized user', () => {
    renderAuthPanel({
      user: null,
      isValid: false,
      loading: false,
    });

    AUTH_LINKS.forEach((href) => {
      expect(screen.getByTestId(`nav-link-${href}`)).toBeInTheDocument();
    });
  });

  it('should does not render anything while loading', () => {
    renderAuthPanel({
      user: null,
      isValid: false,
      loading: true,
    });

    expect(screen.queryByText(/buttons.sign-out/i)).not.toBeInTheDocument();
    AUTH_LINKS.forEach((href) => {
      expect(screen.queryByTestId(`nav-link-${href}`)).not.toBeInTheDocument();
    });
  });
});
