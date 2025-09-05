import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { IntlProvider } from 'next-intl';
import type { JSX } from 'react';

import AuthForm from '@/components/forms/AuthForm';
import type { InputProps } from '@/types/elements/input';
import { TypeForm } from '@/types/enums/authForms';

import SignUpPage from './page';

jest.mock('@/utils/firebase/auth', () => ({
  userRegister: jest.fn(),
}));

const messages = {
  authForms: {
    signUp: {
      title: 'Sign Up',
      submit: 'Sign Up',
      fields: {
        name: { label: 'Name', placeholder: 'Enter name' },
        email: { label: 'E-mail', placeholder: 'Enter email' },
        password: { label: 'Password', placeholder: 'Enter password' },
        confirmPassword: {
          label: 'Confirm Password',
          placeholder: 'Confirm password',
        },
      },
    },
  },
  authErrors: {
    name: {
      required: 'Enter the name',
      capitalized: 'The name must start with a capital letter',
    },
    email: { invalid: 'Invalid email' },
    password: {
      invalid:
        '1 number, 1 uppercase letter, 1 lowercase letter, 1 special character, min 8 chars',
    },
    confirmPassword: {
      required: 'Confirm your password',
      mismatch: 'Passwords do not match',
    },
  },
};

const formConfig: InputProps[] = [
  { name: 'name', type: 'text', label: 'Name' },
  { name: 'email', type: 'text', label: 'E-mail' },
  { name: 'password', type: 'password', label: 'Password' },
  { name: 'confirmPassword', type: 'password', label: 'Confirm Password' },
];

const renderWithIntl = (component: JSX.Element) =>
  render(
    <IntlProvider locale="en" messages={messages}>
      {component}
    </IntlProvider>
  );

describe('SigUpnPage (AuthForm)', () => {
  it('should render SignInPage', () => {
    renderWithIntl(<SignUpPage />);
    const heading = screen.getByRole('heading', { name: /Sign Up/i });
    expect(heading).toBeInTheDocument();
  });

  it('should show errors for invalid data and keeps submit button disabled', async () => {
    const handleSubmit = jest.fn();
    renderWithIntl(
      <AuthForm
        formConfig={formConfig}
        typeForm={TypeForm.SignUp}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'a' },
    });
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: 'email' },
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: '123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: '321' },
    });

    expect(await screen.findByText(/Enter the name/i)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/1 number, 1 uppercase/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Passwords do not match/i)
    ).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enables submit button when all fields are valid', async () => {
    const handleSubmit = jest.fn();
    renderWithIntl(
      <AuthForm
        formConfig={formConfig}
        typeForm={TypeForm.SignUp}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Alex' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: 'qwQW21!@' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'qwQW21!@' },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign Up/i })).toBeEnabled();
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'Alex',
        email: 'test@example.com',
        password: 'qwQW21!@',
        confirmPassword: 'qwQW21!@',
      });
    });
  });
});
