export interface SignInSignUpValues {
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
