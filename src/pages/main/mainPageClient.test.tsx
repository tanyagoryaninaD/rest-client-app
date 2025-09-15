import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'next-intl';

import HomePageClient from '@/pages/main/mainPageClient';

jest.mock('@/i18n/navigation', () => ({
  Link: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{props.children}</a>
  ),
}));

const messages = {
  home_general: {
    greetings_firstRegistered: 'Welcome, {name}!',
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
  toast: {
    auth: {
      welcome: 'Welcome',
      sign_out: 'You have been signed out',
    },

    authErrors: {
      invalidCredential: 'Incorrect username or password',
      emailInUse: 'A user with this E-mail already exists.',
      unknownError: 'Unknown error',
    },
  },
  languages: {
    en: 'English',
  },
};

describe('Home Page', () => {
  it('should render the view for an unauthenticated user', () => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <HomePageClient currentUser="" isNewUser={false} />
      </IntlProvider>
    );
    expect(
      screen.getByRole('heading', { name: /Welcome!/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('link-sign-in')).toBeInTheDocument();
    expect(screen.getByTestId('link-sign-up')).toBeInTheDocument();
  });

  it('should render the view for an authenticated user', () => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <HomePageClient currentUser="John" isNewUser={false} />
      </IntlProvider>
    );
    expect(
      screen.getByRole('heading', { name: /Welcome back, John!/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('link-client')).toBeInTheDocument();
    expect(screen.getByTestId('link-history')).toBeInTheDocument();
  });

  it('should render the view for an first authenticated user', () => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <HomePageClient currentUser="John" isNewUser={true} />
      </IntlProvider>
    );
    expect(
      screen.getByRole('heading', { name: /Welcome, John!/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('link-client')).toBeInTheDocument();
    expect(screen.getByTestId('link-history')).toBeInTheDocument();
  });
});
