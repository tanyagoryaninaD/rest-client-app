import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import { MockIntlProvider } from '@/__test__/mocks/IntlProvider';

import Header from './header';

jest.mock('@/i18n/navigation', () => ({
  Link: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{props.children}</a>
  ),
  usePathname: () => '/',
}));

const messages = {
  home_general: {
    greetings_registered: 'Welcome Back, {name}!',
    greetings_unregistered: 'Welcome!',
    buttons: {
      'sign-in': 'Sign In',
      'sign-up': 'Sign Up',
      'sign-out': 'Sign Out',
      client: 'REST Client',
      history: 'History',
      variables: 'Variables',
    },
  },
  languages: {
    en: 'English',
  },
};

describe('Header Component', () => {
  it('should render main title and auth buttons for an unauthorized user', () => {
    render(MockIntlProvider(<Header />, { locale: 'en', messages }));

    expect(
      screen.getByRole('link', { name: /TDA REST Client/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId('nav-link-sign-in')).toBeInTheDocument();
    expect(screen.getByTestId('nav-link-sign-up')).toBeInTheDocument();
  });

  it('should toggle the sidebar on menu button click', async () => {
    render(MockIntlProvider(<Header />, { locale: 'en', messages }));

    const menuButton = screen.getByTestId('menu-button');
    expect(menuButton).toBeInTheDocument();

    await userEvent.click(menuButton);

    const closeButton = screen.getByTestId('close-menu-button');
    expect(closeButton).toBeInTheDocument();

    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  it('should add "sticky" class to header on scroll', () => {
    jest.useFakeTimers();

    const { container } = render(
      MockIntlProvider(<Header />, { locale: 'en', messages })
    );
    const headerElement = container.querySelector('header');

    expect(headerElement).not.toHaveClass('sticky');

    fireEvent.scroll(window, { target: { pageYOffset: 200 } });

    act(() => {
      jest.runAllTimers();
    });

    expect(headerElement).toHaveClass('sticky');

    fireEvent.scroll(window, { target: { pageYOffset: 50 } });

    act(() => {
      jest.runAllTimers();
    });

    expect(headerElement).not.toHaveClass('sticky');

    jest.useRealTimers();
  });
});
