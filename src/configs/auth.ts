import type { InputProps } from '@/types/elements/input';

export const signUpFormConfig: InputProps[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter name',
    autoFocus: true,
  },
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'Enter email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm password',
  },
];

export const signInFormConfig: InputProps[] = [
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'Enter email',
    autoFocus: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
];
