import { NextResponse } from 'next/server';
import codegen from 'postman-code-generators';
import { type PostmanRequestData } from 'postman-collection';
import { HeaderList, Request as PostmanRequest } from 'postman-collection';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const data = (await request.json()) as PostmanRequestData;
    const { url, method, headers, body, language, variant } = data;

    const postmanRequest = new PostmanRequest({
      url,
      method,
      headers: new HeaderList(),
      body: body ?? undefined,
    });

    headers?.forEach((header) => {
      postmanRequest.addHeader(header);
    });

    const options = {
      indentCount: 3,
      trimRequestBody: true,
      followRedirect: true,
      includeHeaders: true,
    };

    return await new Promise((resolve) => {
      codegen.convert(
        language,
        variant,
        postmanRequest,
        options,
        (error, snippet) => {
          if (error) {
            resolve(NextResponse.json({ error: 'generate' }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ code: snippet }));
          }
        }
      );
    });
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
}
