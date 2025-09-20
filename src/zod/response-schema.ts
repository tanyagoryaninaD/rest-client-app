import { z } from 'zod';

export const ClientErrorBodySchema = z.object({
  clientError: z.enum([
    'unauthorized',
    'invalid_client_request_json',
    'invalid_client_request_data',
  ]),
});

export const SuccessResponseSchema = z.object({
  responseBody: z.string(),
  responseStatus: z.number(),
});
