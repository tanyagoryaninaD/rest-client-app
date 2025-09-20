import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSearchParams } from 'next/navigation';
import { IntlProvider } from 'next-intl';

import { messages } from '@/__test__/mocks/messages';
import { useAppSelector } from '@/hooks/redux';
import { usePathname } from '@/i18n/navigation';
import ClientPage from '@/pages-components/client/client';
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

jest.mock('@/hooks/redux', () => ({
  useAppSelector: jest.fn(),
}));

describe('GenerateCode', () => {
  beforeEach(() => {
    (getHistory as jest.Mock).mockResolvedValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calls fetch with form data and return resolved value', async () => {
    (usePathname as jest.Mock).mockReturnValue('client');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      someValue: 'value',
    });

    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue({ code: 'test-code' } as unknown as Response),
    } as unknown as Response);

    render(
      <IntlProvider locale="en" messages={messages}>
        <ClientPage />
      </IntlProvider>
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

    const generatorButton = screen.getByTestId('request-generator-button');
    await userEvent.click(generatorButton);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/en/api/postman-code-generators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: 'GET',
          url: 'test-endpoint',
          headers: [{ key: 'Content-Type', value: 'text/html' }],
          body: 'test-body',
          language: 'JavaScript',
          variant: 'Fetch',
        }),
      });
    });

    fetchSpy.mockRestore();
  });

  it('should copy snippet', async () => {
    (usePathname as jest.Mock).mockReturnValue('client');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      someValue: 'value',
    });

    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue({ code: 'test-code' } as unknown as Response),
    } as unknown as Response);

    const mockWriteText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });

    render(
      <IntlProvider locale="en" messages={messages}>
        <ClientPage />
      </IntlProvider>
    );

    const url = screen.getByTestId('request-url').querySelector('input');

    if (url) {
      await userEvent.type(url, 'test-endpoint');
    }

    const generatorButton = screen.getByTestId('request-generator-button');
    const copyButton = screen.getByTestId('request-generator-copy');

    await userEvent.click(generatorButton);

    await waitFor(() => {
      expect(copyButton).toBeEnabled();
    });

    await userEvent.click(copyButton);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith('test-code');
    });

    fetchSpy.mockRestore();
  });
});
