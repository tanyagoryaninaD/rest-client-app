import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { ToastContainer } from 'react-toastify';

import ErrorBoundaryProvider from '@/components/error-boundary/error-boundary-provider';
import MainLayout from '@/components/layout/layout';
import { routing } from '@/i18n/routing';
import { theme } from '@/theme';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'TDA REST Client',
  description: 'A brand new platform for testing and building REST APIs',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={roboto.variable}>
      <body>
        <NextIntlClientProvider>
          <ThemeProvider theme={theme}>
            <ErrorBoundaryProvider>
              <AppRouterCacheProvider>
                <CssBaseline />
                <MainLayout>{children}</MainLayout>
                <ToastContainer position="top-right" autoClose={2000} />
              </AppRouterCacheProvider>
            </ErrorBoundaryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
