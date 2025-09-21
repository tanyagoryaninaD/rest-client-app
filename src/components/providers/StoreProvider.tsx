'use client';

import { Provider } from 'react-redux';

import store from '@/store';
import AuthHandler from '@/utils/handlers/authHandler';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthHandler />
      {children}
    </Provider>
  );
}
