import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import z from 'zod';

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
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const startTime = Date.now();
  let clientRequestBody: unknown;

  try {
    clientRequestBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'invalid_client_request_json' },
      { status: 400 }
    );
  }

  const parsedClientRequestBody =
    ProxyClientRequestSchema.safeParse(clientRequestBody);

  if (!parsedClientRequestBody.success) {
    return NextResponse.json(
      {
        error: 'invalid_client_request_data',
        details: z.prettifyError(parsedClientRequestBody.error),
      },
      { status: 400 }
    );
  }

  const { url, method, body, headers, pathNameRequest } =
    parsedClientRequestBody.data;

  const requestSize = body ? new Blob([body]).size : 0;

  let responseBody: string;
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

    try {
      await saveHistory(userId, analyticsData);
    } catch (error) {
      console.error('Firebase saveHistory failed:', error);
    }

    return NextResponse.json({ error: errorDetails }, { status: 502 });
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

  try {
    await saveHistory(userId, analyticsData);
  } catch (error) {
    console.error('Firebase saveHistory failed:', error);
  }

  return new NextResponse(responseBody, {
    status: apiResponse.status,
    statusText: apiResponse.statusText,
  });
}
