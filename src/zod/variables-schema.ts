import { z } from 'zod';

export const VariablesStorageSchema = z.record(z.string(), z.string());

export const VariableFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'name_required' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: 'name_wrong_chars',
    }),
  value: z
    .string()
    .nonempty({ message: 'value_required' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'value_wrong_chars',
    }),
});
