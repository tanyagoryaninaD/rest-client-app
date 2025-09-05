import type { UseFormRegister } from 'react-hook-form';

import type { FormValues, SignInSignUpValues } from '../authForms';

export interface InputProps {
  name: FormValues;
  type: string;
  id?: string;
  label?: string;
  placeholder?: string;
  autoFocus?: boolean;
  errorMessage?: string;
  register?: UseFormRegister<SignInSignUpValues>;
}
