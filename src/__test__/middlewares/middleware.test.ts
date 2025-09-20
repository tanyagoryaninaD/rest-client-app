import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import middleware from '@/middleware';

jest.mock('next-intl/middleware', () => () => () => NextResponse.next());

const buildRequest = (url: string, token?: string) => {
  const fullUrl = new URL(url, 'http://localhost:3000');
  const request = {
    nextUrl: fullUrl,
    url: fullUrl.toString(),
    cookies: {
      get: (key: string) =>
        key === 'token' && token ? { value: token } : undefined,
    },
  } as unknown as NextRequest;

  return request;
};

describe('middleware', () => {
  it('should redirects to "/" if accessing private route without token', () => {
    const req = buildRequest('http://localhost:3000/en/history');
    const res = middleware(req);

    expect(res.headers.get('location')).toBe('http://localhost:3000/en');
  });

  it('should access to private route if token exists', () => {
    const req = buildRequest('http://localhost:3000/en/history', 'valid-token');
    const res = middleware(req);

    expect(res).toEqual(NextResponse.next());
  });

  it('should redirected authenticated user to "/" from public routes', () => {
    const req = buildRequest('http://localhost:3000/en/sign-in', 'valid-token');
    const res = middleware(req);

    expect(res.headers.get('location')).toBe('http://localhost:3000/en');
  });

  it('should provide access to public routes to unauthenticated users', () => {
    const req = buildRequest('http://localhost:3000/en/sign-in');
    const res = middleware(req);

    expect(res).toEqual(NextResponse.next());
  });
});
