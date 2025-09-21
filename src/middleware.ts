import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const privateRoutes = ['/history', '/variables'];
const publicRoutes = ['/sign-in', '/sign-up'];
const nestedPrivateRoutes = ['/client'];

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const token = request.cookies.get('token')?.value;
  const pathWithoutLocale = request.nextUrl.pathname.replace(/^\/(en|ru)/, '');
  const locale = request.nextUrl.pathname.split('/')[1];

  const isPrivateRoute = privateRoutes.includes(pathWithoutLocale);
  const isNestedPrivateRoutes = nestedPrivateRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  if ((isPrivateRoute || isNestedPrivateRoutes) && !token) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  if (publicRoutes.includes(pathWithoutLocale) && token) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/', '/(en|ru)/:path*', '/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
