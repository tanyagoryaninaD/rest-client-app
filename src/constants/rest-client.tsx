export const HEADERS = {
  'Content-Type': [
    'application/json',
    'text/html',
    'application/xml',
    'multipart/form-data',
  ],
  Accept: ['application/json', 'text/html', 'application/xml', '*/*'],
  Authorization: ['Bearer <token>', 'Basic <credentials>'],
  'Cache-Control': ['no-cache', 'no-store', 'max-age=3600'],
  'Accept-Language': ['en-US', 'ru-RU'],
  'User-Agent': ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'curl/7.64.1'],
  Cookie: ['sessionId=', 'user='],
  'X-Requested-With': ['XMLHttpRequest'],
} as const;

export const METHODS = ['get', 'post', 'put', 'punch', 'delete'];

export const CLIENT_FORM = {
  method: 'method',
  url: 'url',
} as const;
