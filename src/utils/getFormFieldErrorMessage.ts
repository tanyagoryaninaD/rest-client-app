import type { FieldErrors } from 'react-hook-form';

import type { FormValues, SingInSingUpValues } from '../types/elements/input';

export function getErrorMessage(
  name: FormValues,
  hookFormErrors?: FieldErrors<SingInSingUpValues>
): string | undefined {
  if (hookFormErrors) return hookFormErrors[name]?.message;
  return undefined;
}
