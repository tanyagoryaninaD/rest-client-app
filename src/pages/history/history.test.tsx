import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'next-intl';
import { Provider } from 'react-redux';

import userReducer from '@/store/slicers/userSlicer';
import type { HistoryCollection } from '@/types/userData';
import { getHistory } from '@/utils/firebase/collections';

import HistoryClient from './HistoryClient';

jest.mock('@/i18n/navigation', () => ({
  Link: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{props.children}</a>
  ),
}));

jest.mock('@/utils/firebase/collections', () => ({
  getHistory: jest.fn(),
}));

const messages = {
  history_general: {
    title: 'History',
    invalidHistory: {
      title: 'You have not executed any requests',
      subtitle: 'It is empty here. Try:',
      button: 'Client',
    },
    card: {
      status: 'Status',
      duration: 'Duration',
      'request-size': 'Request Size',
      'response-size': 'Response Size',
      time: 'ms',
      size: 'B',
    },
  },
};

describe('History Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should renders alternative component when collection is empty', async () => {
    (getHistory as jest.Mock).mockResolvedValue(null);

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
          <HistoryClient requests={[]} />
        </IntlProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/You have not executed any requests/i)
      ).toBeInTheDocument();
    });
  });

  it('should renders collection', async () => {
    const requests: HistoryCollection[] = [
      {
        id: '1',
        pathNameRequest: 'pathname1',
        requestDuration: 50,
        responseStatusCode: 200,
        requestTimestamp: 2000,
        requestMethod: 'GET',
        requestSize: 10,
        responseSize: 20,
        errorDetails: '',
        endpointUrl: 'api/first',
      },
      {
        id: '2',
        pathNameRequest: 'pathname2',
        requestDuration: 30,
        responseStatusCode: 404,
        requestTimestamp: 1000,
        requestMethod: 'POST',
        requestSize: 15,
        responseSize: 25,
        errorDetails: 'Not Found',
        endpointUrl: 'api/second',
      },
    ];
    (getHistory as jest.Mock).mockResolvedValue(requests);

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
          <HistoryClient requests={requests} />
        </IntlProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(2);
    expect(links[1]).toHaveAttribute('href', '/client/pathname2');
    expect(links[0]).toHaveAttribute('href', '/client/pathname1');
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('POST')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('should correctly navigates when clicking a card ', async () => {
    const requests: HistoryCollection[] = [
      {
        id: '1',
        pathNameRequest: 'pathname',
        requestDuration: 50,
        responseStatusCode: 200,
        requestTimestamp: 1000,
        requestMethod: 'GET',
        requestSize: 10,
        responseSize: 20,
        errorDetails: '',
        endpointUrl: 'api/first',
      },
    ];
    (getHistory as jest.Mock).mockResolvedValue(requests);

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
          <HistoryClient requests={requests} />
        </IntlProvider>
      </Provider>
    );

    await waitFor(() => screen.getByText('GET'));
    const link = screen.getByRole('link', { name: /GET/i });
    expect(link).toHaveAttribute('href', '/client/pathname');

    await userEvent.click(link);
    expect(link).toHaveAttribute('href', '/client/pathname');
  });
});
