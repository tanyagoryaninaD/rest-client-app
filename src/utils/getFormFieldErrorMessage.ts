import type { FieldErrors } from 'react-hook-form';

import type { FormValues, SignInSignUpValues } from '@/types/authForms';

export function getErrorMessage(
  name: FormValues,
  hookFormErrors?: FieldErrors<SignInSignUpValues>
): string | undefined {
  if (hookFormErrors) return hookFormErrors[name]?.message;
  return undefined;
}
