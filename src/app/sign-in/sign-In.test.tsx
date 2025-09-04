import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import AuthForm from '@/components/forms/AuthForm';
import { ZOD_ERRORS } from '@/constants/zodMessages';
import { TypeForm } from '@/types/enums/authForms';

import SignInPage from './page';

jest.mock('@/utils/firebase/auth', () => ({
  userLogin: jest.fn(),
}));

describe('SignInPage', () => {
  it('renders the page title', () => {
    render(<SignInPage />);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});

describe('AuthForm (SignIn)', () => {
  it('should show errors on empty fields', async () => {
    const handleSubmit = jest.fn();

    render(
      <AuthForm
        formConfig={[
          { name: 'email', label: 'Email', type: 'text' },
          { name: 'password', label: 'Password', type: 'password' },
        ]}
        onSubmit={handleSubmit}
        typeForm={TypeForm.SignIn}
        formTitle="Sign In"
        buttonText="Submit"
        data-testid="auth-form"
      />
    );

    fireEvent.blur(screen.getByLabelText(/email/i));
    fireEvent.blur(screen.getByLabelText(/password/i));

    expect(
      await screen.findByText(ZOD_ERRORS.email.invalid)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(ZOD_ERRORS.password.invalid)
    ).toBeInTheDocument();

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('should submit successfully with valid data', async () => {
    const handleSubmit = jest.fn();

    render(
      <AuthForm
        formConfig={[
          { name: 'email', label: 'Email', type: 'text' },
          { name: 'password', label: 'Password', type: 'password' },
        ]}
        onSubmit={handleSubmit}
        typeForm={TypeForm.SignIn}
        formTitle="Sign In"
        buttonText="Submit"
      />
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'qwQw12!@' },
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'qwQw12!@',
      });
    });
  });
});
