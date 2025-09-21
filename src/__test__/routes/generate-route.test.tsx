import { convert } from 'postman-code-generators';
import { Request as PostmanRequest } from 'postman-collection';

import { POST } from '@/app/[locale]/api/postman-code-generators/route';

jest.mock('postman-code-generators', () => ({
  convert: jest.fn(),
}));

jest.mock('postman-collection', () => ({
  Request: jest.fn().mockImplementation(
    (data) =>
      ({
        addHeader: jest.fn(),
        ...data,
      }) as Request
  ),
  HeaderList: jest.fn(),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options?: ResponseInit) => ({
      json: () => data as object,
      status: options?.status ?? 200,
      headers: options?.headers ?? {},
    })),
    next: jest.fn(() => ({})),
  },
}));

const mockConvert = convert;
const mockRequest = PostmanRequest;

describe('POST /api/generate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate code successfully', async () => {
    (mockConvert as jest.Mock).mockImplementation(
      (
        _language: unknown,
        _variant: unknown,
        _request: unknown,
        _options: unknown,
        callback: (error: null, snippet: string) => void
      ) => {
        callback(null, 'test-generated-code');
      }
    );

    const mockRequestData = {
      url: 'https://test.com',
      method: 'GET',
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      body: 'test-body',
      language: 'JavaScript',
      variant: 'Fetch',
    };

    const request = new Request('http://localhost/api/generate', {
      method: 'POST',
      body: JSON.stringify(mockRequestData),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    expect(response.status).toBe(200);

    const json = (await response.json()) as Response;

    expect(json).toEqual({ code: 'test-generated-code' });

    expect(mockConvert).toHaveBeenCalledWith(
      'JavaScript',
      'Fetch',
      expect.any(Object),
      expect.any(Object),
      expect.any(Function)
    );
    expect(mockRequest).toHaveBeenCalledWith({
      url: mockRequestData.url,
      method: mockRequestData.method,
      headers: {},
      body: mockRequestData.body,
    });
  });

  it('should handle invalid error', async () => {
    const request = new Request('http://localhost/api/generate', {
      method: 'POST',
      body: 'invalid-json',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const json = (await response.json()) as Response;
    expect(json).toEqual({ error: 'invalid' });
  });

  it('should handle generate error', async () => {
    (mockConvert as jest.Mock).mockImplementation(
      (
        _language: unknown,
        _variant: unknown,
        _request: unknown,
        _options: unknown,
        callback: (error: Error, snippet: null) => void
      ) => {
        callback(new Error('invalid'), null);
      }
    );

    const mockRequestData = {
      url: 'https://test.com',
      method: 'POST',
      headers: [],
      body: null,
      language: 'Python',
      variant: 'Requests',
    };
    const request = new Request('http://localhost/api/generate', {
      method: 'POST',
      body: JSON.stringify(mockRequestData),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
    const json = (await response.json()) as Response;
    expect(json).toEqual({ error: 'generate' });
  });
});
