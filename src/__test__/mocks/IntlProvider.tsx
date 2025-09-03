import { IntlProvider } from 'next-intl';
import type { JSX } from 'react';

interface Options {
  locale: string;
  messages: object;
}

export const MockIntlProvider = (children: JSX.Element, options?: Options) => (
  <IntlProvider
    locale={options?.locale ?? 'en'}
    messages={options?.messages ?? {}}
  >
    {children}
  </IntlProvider>
);
