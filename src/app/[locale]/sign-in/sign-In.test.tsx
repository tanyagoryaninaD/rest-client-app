import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { IntlProvider } from 'next-intl';
import type { JSX } from 'react';

import AuthForm from '@/components/forms/AuthForm';
import type { InputProps } from '@/types/elements/input';
import { TypeForm } from '@/types/enums/authForms';

import SignInPage from './page';

jest.mock('@/utils/firebase/auth', () => ({
  userLogin: jest.fn(),
}));

const messages = {
  authForms: {
    signIn: {
      title: 'Sign In',
      submit: 'Sign In',
      fields: {
        email: {
          label: 'E-mail',
          placeholder: 'Enter email',
        },
        password: {
          label: 'Password',
          placeholder: 'Enter password',
        },
      },
    },
  },
  authErrors: {
    email: { invalid: 'Invalid email' },
    password: {
      invalid:
        '1 number, 1 uppercase letter, 1 lowercase letter, 1 special character, min 8 chars',
    },
  },
};

const formConfig: InputProps[] = [
  { name: 'email', type: 'text', label: 'E-mail' },
  { name: 'password', type: 'password', label: 'Password' },
];

const renderWithIntl = (component: JSX.Element) =>
  render(
    <IntlProvider locale="en" messages={messages}>
      {component}
    </IntlProvider>
  );

describe('SignInPage (AuthForm)', () => {
  it('should render SignInPage ', () => {
    renderWithIntl(<SignInPage />);
    const heading = screen.getByRole('heading', { name: /Sign In/i });
    expect(heading).toBeInTheDocument();
  });

  it('should show errors for invalid data and keeps submit button disabled', async () => {
    const handleSubmit = jest.fn();
    renderWithIntl(
      <AuthForm
        formConfig={formConfig}
        typeForm={TypeForm.SignIn}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: 'email' },
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: '123' },
    });

    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/1 number, 1 uppercase/i)
    ).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enables submit button when all fields are valid', async () => {
    const handleSubmit = jest.fn();
    renderWithIntl(
      <AuthForm
        formConfig={formConfig}
        typeForm={TypeForm.SignIn}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: 'qwQW21!@' },
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeEnabled();
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'qwQW21!@',
      });
    });
  });
});
