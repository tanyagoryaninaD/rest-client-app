export interface SignInSignUpValues {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export type FormValues = keyof SignInSignUpValues;
