import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'next-intl';
import { Provider } from 'react-redux';

import userReducer from '@/store/slicers/userSlicer';

import Home from './page';

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
    const store = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: {
          user: null,
          isValid: false,
          loading: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <IntlProvider locale="en" messages={messages}>
          <Home />
        </IntlProvider>
      </Provider>
    );
    expect(
      screen.getByRole('heading', { name: /Welcome!/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('link-sign-in')).toBeInTheDocument();
    expect(screen.getByTestId('link-sign-up')).toBeInTheDocument();
  });

  it('should render the view for an authenticated user', () => {
    const store = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: {
          user: {
            displayName: 'John',
            isNewUser: false,
            expiresIn: Date.now() + 1000,
          },
          isValid: true,
          loading: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <IntlProvider locale="en" messages={messages}>
          <Home />
        </IntlProvider>
      </Provider>
    );
    expect(
      screen.getByRole('heading', { name: /Welcome back, John!/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('link-client')).toBeInTheDocument();
    expect(screen.getByTestId('link-history')).toBeInTheDocument();
  });

  it('should render the view for an first authenticated user', () => {
    const store = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: {
          user: {
            displayName: 'John',
            isNewUser: true,
            expiresIn: Date.now() + 1000,
          },
          isValid: true,
          loading: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <IntlProvider locale="en" messages={messages}>
          <Home />
        </IntlProvider>
      </Provider>
    );
    expect(
      screen.getByRole('heading', { name: /Welcome, John!/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('link-client')).toBeInTheDocument();
    expect(screen.getByTestId('link-history')).toBeInTheDocument();
  });
});
