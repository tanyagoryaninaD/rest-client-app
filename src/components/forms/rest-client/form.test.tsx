import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSearchParams } from 'next/navigation';
import { IntlProvider } from 'next-intl';
import { Provider } from 'react-redux';

import { usePathname, useRouter } from '@/i18n/navigation';
import ClientPage from '@/pages/client/client';
import userReducer from '@/store/slicers/userSlicer';
import { getHistory } from '@/utils/firebase/collections';

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

const replace = jest.fn();

describe('Client Form', () => {
  beforeEach(() => {
    (getHistory as jest.Mock).mockResolvedValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calls replace with form data', async () => {
    (usePathname as jest.Mock).mockReturnValue('client');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
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

    const url = screen.getByTestId('request-url').querySelector('input');
    const headerKey = screen
      .queryAllByTestId('request-header-key')[0]
      .querySelector('input');
    const headerValue = screen
      .queryAllByTestId('request-header-value')[0]
      .querySelector('input');
    const body = screen.getByTestId('request-body').querySelector('textarea');

    if (url) {
      await userEvent.type(url, 'test-endpoint');
    }
    if (headerKey && headerValue) {
      await userEvent.type(headerKey, 'Content-Type');
      await userEvent.type(headerValue, 'text/html');
    }
    if (body) {
      await userEvent.type(body, 'test-body');
    }

    const submitButton = screen.getByTestId('request-submit');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith({
        pathname: 'client/GET/dGVzdC1lbmRwb2ludA==/dGVzdC1ib2R5',
        query: {
          'Content-Type': 'text/html',
        },
      });
    });
  });
});
