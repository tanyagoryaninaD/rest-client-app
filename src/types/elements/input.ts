import type { UseFormRegister } from 'react-hook-form';
export interface SingInSingUpValues {
  name?: string;
  age?: number;
  email: string;
  password: string;
  confirmPassword?: string;
}

export type FormValues =
  | 'name'
  | 'age'
  | 'email'
  | 'password'
  | 'confirmPassword';

export interface InputProps {
  name: FormValues;
  type: string;
  id?: string;
  label?: string;
  placeholder?: string;
  autoFocus?: boolean;
  errorMessage?: string;
  register?: UseFormRegister<SingInSingUpValues>;
}
