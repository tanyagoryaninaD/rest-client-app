import { IntlProvider } from 'next-intl';
import { JSX } from 'react';

interface Options {
  locale: string;
  messages: object;
}

export const MockIntlProvider = (children: JSX.Element, options: Options) => (
  <IntlProvider locale={options?.locale} messages={options?.messages}>
    {children}
  </IntlProvider>
);
