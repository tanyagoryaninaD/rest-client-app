export const HEADERS = {
  'Content-Type': [
    'application/json',
    'text/html',
    'application/xml',
    'multipart/form-data',
    'application/x-www-form-urlencoded',
  ],
  Accept: ['application/json', 'text/html', 'application/xml', '*/*'],
  Authorization: ['Bearer <token>', 'Basic <credentials>'],
  'Cache-Control': [],
  'Accept-Language': ['en-US', 'ru-RU'],
  'User-Agent': [],
  Cookie: ['sessionId=', 'user='],
  'X-Requested-With': ['XMLHttpRequest'],
  'Accept-Encoding': [],
  'Access-Control-Allow-Origin': [],
  'Access-Control-Allow-Methods': [],
  'Access-Control-Allow-Headers': [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
  ],
  'Content-Disposition': [],
  'Content-Security-Policy': [],
  'Referrer-Policy': [],
  'Strict-Transport-Security': [],
  'X-Frame-Options': [],
  'X-Content-Type-Options': [],
  ETag: [],
  'If-None-Match': [],
  'Last-Modified': [],
} as const;

export const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;

export const CLIENT_FORM = {
  method: 'method',
  url: 'url',
  body: 'body',
  generator: 'generator',
} as const;

export const GENERATORS = {
  C: ['libcurl'],
  'C#': ['HttpClient', 'RestSharp'],
  cURL: ['cURL'],
  Dart: ['http'],
  Go: ['Native'],
  HTTP: ['HTTP'],
  Java: ['OkHttp', 'Unirest'],
  JavaScript: ['Fetch', 'jQuery', 'XHR'],
  Kotlin: ['OkHttp'],
  NodeJs: ['Axios', 'Native', 'Request', 'Unirest'],
  'Objective-C': ['NSURLSession'],
  OCaml: ['Cohttp'],
  PHP: ['cURL', 'Guzzle', 'pecl_http', 'HTTP_Request2'],
  PowerShell: ['RestMethod'],
  Python: ['http.client', 'Requests'],
  R: ['httr', 'RCurl'],
  Rust: ['Reqwest'],
  Ruby: ['Net:HTTP'],
  Shell: ['Httpie', 'wget'],
  Swift: ['URLSession'],
} as const;

export const DEFAULT_GENERATOR = {
  language: 'JavaScript',
  variant: 'Fetch',
} as const;
