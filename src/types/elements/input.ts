import { UseFormRegister } from 'react-hook-form';
export type SingInSingUpValues = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FormValues =
  | 'name'
  | 'age'
  | 'email'
  | 'password'
  | 'confirmPassword';

export type InputProps = {
  name: FormValues;
  type: string;
  id?: string;
  label?: string;
  placeholder?: string;
  autoFocus?: boolean;
  errorMessage?: string;
  register?: UseFormRegister<SingInSingUpValues>;
};
