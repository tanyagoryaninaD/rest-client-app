import type { z } from 'zod';

import type { VariablesStorageSchema } from '@/zod/variables-schema';

export type VariablesStorage = z.infer<typeof VariablesStorageSchema>;

export interface VariableFormFields {
  name: string;
  value: string;
}
