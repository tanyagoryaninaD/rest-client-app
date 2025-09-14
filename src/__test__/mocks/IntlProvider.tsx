import { IntlProvider } from 'next-intl';
import type { JSX } from 'react';
import { Provider } from 'react-redux';

import store from '@/store';

interface Options {
  locale: string;
  messages: object;
}

export const MockIntlProvider = (children: JSX.Element, options?: Options) => (
  <Provider store={store}>
    <IntlProvider
      locale={options?.locale ?? 'en'}
      messages={options?.messages ?? {}}
    >
      {children}
    </IntlProvider>
  </Provider>
);
