import { InputProps } from '@/types/elements/input';

export const singUpFormConfig: InputProps[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter name',
    autoFocus: true,
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    placeholder: 'Enter age',
  },
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'example@mail.com',
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

export const singInFormConfig: InputProps[] = [
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'example@mail.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
];
