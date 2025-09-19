import { z } from 'zod';

import { METHODS } from '@/constants/rest-client';

export const ProxyClientRequestSchema = z.object({
  url: z.url({ error: 'url_parse_error' }),
  method: z.enum(METHODS),
  headers: z.record(z.string(), z.string()),
  body: z.string().optional(),
  pathNameRequest: z.string(),
});
