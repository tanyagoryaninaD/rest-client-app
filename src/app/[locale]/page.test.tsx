import { render, screen } from '@testing-library/react';

import { MockIntlProvider } from '@/__test__/mocks/IntlProvider';

import Home from './page';

jest.mock('@/i18n/navigation', () => ({
  Link: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{props.children}</a>
  ),
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

describe('Home Page', () => {
  it('should render the view for an unauthenticated user', () => {
    render(
      MockIntlProvider(<Home user={undefined} />, { locale: 'en', messages })
    );
    expect(
      screen.getByRole('heading', { name: /Welcome!/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('link-sign-in')).toBeInTheDocument();
    expect(screen.getByTestId('link-sign-up')).toBeInTheDocument();
  });

  it('should render the view for an authenticated user', () => {
    render(
      MockIntlProvider(<Home user={{ name: 'John' }} />, {
        locale: 'en',
        messages,
      })
    );
    expect(
      screen.getByRole('heading', { name: /Welcome back, John!/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('link-client')).toBeInTheDocument();
    expect(screen.getByTestId('link-history')).toBeInTheDocument();
  });
});
