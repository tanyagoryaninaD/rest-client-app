import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { verifyIdToken } from '@/lib/fireBaseAdmin';
import type { FirestoreHistoryDoc } from '@/types/userData';
import { saveHistory } from '@/utils/firebase/collections';
import { ProxyClientRequestSchema } from '@/zod/proxy-client-request-schema';

export async function POST(request: Request) {
  let userId: string;

  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
      throw new Error('No token found');
    }

    const decodedToken = await verifyIdToken(token);
    userId = decodedToken.uid;
  } catch {
    return NextResponse.json({ clientError: 'unauthorized' }, { status: 200 });
  }

  let clientRequestBody: unknown;

  try {
    clientRequestBody = await request.json();
  } catch {
    return NextResponse.json(
      { clientError: 'invalid_client_request_json' },
      { status: 200 }
    );
  }

  const parsedClientRequestBody =
    ProxyClientRequestSchema.safeParse(clientRequestBody);

  if (!parsedClientRequestBody.success) {
    return NextResponse.json(
      {
        clientError: 'invalid_client_request_data',
      },
      { status: 200 }
    );
  }

  const { url, method, body, headers, pathNameRequest } =
    parsedClientRequestBody.data;

  const startTime = Date.now();
  const requestSize = body ? new Blob([body]).size : 0;

  let responseBody = '';
  let apiResponse: Response;
  let errorDetails = '';

  try {
    apiResponse = await fetch(url, {
      method,
      headers,
      body: method !== 'GET' ? body : undefined,
    });

    responseBody = await apiResponse.text();

    if (!apiResponse.ok) {
      errorDetails = `HTTP Error: ${apiResponse.status} ${apiResponse.statusText}`;
    }
  } catch (error: unknown) {
    errorDetails = error instanceof Error ? error.message : 'Network error';

    const analyticsData: FirestoreHistoryDoc = {
      requestMethod: method,
      endpointUrl: url,
      requestTimestamp: startTime,
      responseStatusCode: 0,
      requestDuration: Date.now() - startTime,
      requestSize,
      responseSize: 0,
      errorDetails,
      pathNameRequest,
    };

    await saveHistory(userId, analyticsData);

    return NextResponse.json(
      {
        responseBody,
        responseStatus: 0,
      },
      { status: 200 }
    );
  }

  const analyticsData: FirestoreHistoryDoc = {
    requestMethod: method,
    endpointUrl: url,
    requestTimestamp: startTime,
    responseStatusCode: apiResponse.status,
    requestDuration: Date.now() - startTime,
    requestSize,
    responseSize: new Blob([responseBody]).size,
    errorDetails,
    pathNameRequest,
  };

  await saveHistory(userId, analyticsData);

  return NextResponse.json(
    {
      responseBody: responseBody,
      responseStatus: apiResponse.status,
    },
    { status: 200 }
  );
}
