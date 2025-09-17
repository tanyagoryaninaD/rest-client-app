import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { IntlProvider } from 'next-intl';
import { Provider } from 'react-redux';

import ClientWithAuth from '@/app/[locale]/client/page';
import { usePathname, useRouter } from '@/i18n/navigation';
import userReducer from '@/store/slicers/userSlicer';
import { getHistory } from '@/utils/firebase/collections';

import ClientPage from './client';

jest.mock('@/i18n/navigation', () => ({
  Link: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{props.children}</a>
  ),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('@/utils/firebase/collections', () => ({
  getHistory: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: jest.fn(),
}));

const replace = jest.fn();

const messages = {
  'rest-client': {
    request: {
      title: 'REST Client',
      send: 'Send',
      labels: {
        method: 'Method',
        url: 'Endpoint URL',
        key: 'Key',
        value: 'Value',
        body: 'Body',
        generator: 'Language',
        snippet: 'Code snippet',
      },
      placeholders: {
        body: 'Enter the request body here',
      },
      buttons: {
        generate: 'Generate Code',
        copy: 'Copy',
        headers: 'Headers',
      },
      tooltips: {
        header:
          'You can enter your own values. Autocomplete offers examples, but you can ignore them.',
      },
    },
    response: {
      title: 'Response',
      labels: {
        status: 'Status code:',
        body: 'Body:',
      },
      placeholders: {
        status: 'HTTP Status Code',
        body: 'Read-Only JSON Viewer',
      },
    },
    errors: {
      unknown: 'Unknown error',
      generator: {
        generate: 'Code generation error',
        invalid: 'Invalid request',
      },
    },
  },
};

describe('Client Page', () => {
  beforeEach(() => {
    (getHistory as jest.Mock).mockResolvedValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders form with empty fields and default method', async () => {
    (usePathname as jest.Mock).mockReturnValue('client');
    (useSearchParams as jest.Mock).mockReturnValue(
      new ReadonlyURLSearchParams()
    );
    (useRouter as jest.Mock).mockReturnValue({ replace });

    const store = configureStore({
      reducer: { user: userReducer },
      preloadedState: {
        user: {
          user: {
            userId: 'user1',
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
          <ClientPage />
        </IntlProvider>
      </Provider>
    );

    const headersButton = screen.getByTestId('request-headers-toggle');
    await userEvent.click(headersButton);

    const method = screen.getByTestId('request-method').querySelector('input');
    const url = screen.getByTestId('request-url').querySelector('input');
    const headerKey = screen
      .queryAllByTestId('request-header-key')[0]
      .querySelector('input');
    const headerValue = screen
      .queryAllByTestId('request-header-value')[0]
      .querySelector('input');
    const body = screen.getByTestId('request-body').querySelector('textarea');

    expect(screen.getByTestId('form-client')).toBeInTheDocument();
    expect(method?.value).toBe('GET');
    expect(url?.value).toBe('');
    expect(headerKey?.value).toBe('');
    expect(headerValue?.value).toBe('');
    expect(body?.value).toBe('');
  });

  it('should renders with auth', async () => {
    (usePathname as jest.Mock).mockReturnValue(
      'client/POST/dGVzdC1lbmRwb2ludA==/dGVzdC1ib2R5'
    );
    (useRouter as jest.Mock).mockReturnValue({ replace });

    const params = new URLSearchParams({ count: '1' });
    params.append('Content-Type', 'text/html');
    (useSearchParams as jest.Mock).mockReturnValue(params);

    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn(),
    });

    const store = configureStore({
      reducer: { user: userReducer },
      preloadedState: {
        user: {
          user: {
            userId: 'user1',
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
          <ClientWithAuth />
        </IntlProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('form-client')).toBeInTheDocument();
    });
  });
});
