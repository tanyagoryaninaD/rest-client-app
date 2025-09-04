import { fireEvent, render, screen } from '@testing-library/react';

import AuthForm from '@/components/forms/AuthForm';
import { ZOD_ERRORS } from '@/constants/zodMessages';
import { TypeForm } from '@/types/enums/authForms';

import SignUpPage from './page';

jest.mock('@/utils/firebase/auth', () => ({
  userRegister: jest.fn(),
}));

describe('SignUpPage', () => {
  it('renders the page title', () => {
    render(<SignUpPage />);
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });
});

describe('AuthForm (SignUp)', () => {
  it('should show errors on empty fields', async () => {
    const handleSubmit = jest.fn();

    render(
      <AuthForm
        formConfig={[
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'age', label: 'Age', type: 'number' },
          { name: 'email', label: 'Email', type: 'text' },
          { name: 'password', label: 'Password', type: 'password' },
          {
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
          },
        ]}
        onSubmit={handleSubmit}
        typeForm={TypeForm.SignUp}
        formTitle="Sign Up"
        buttonText="Register"
      />
    );

    fireEvent.blur(screen.getByLabelText(/name/i));
    fireEvent.blur(screen.getByLabelText(/email/i));
    fireEvent.blur(screen.getByLabelText(/^Password$/i));
    fireEvent.blur(screen.getByLabelText(/confirm password/i));

    expect(
      await screen.findByText(ZOD_ERRORS.name.required)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(ZOD_ERRORS.email.invalid)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(ZOD_ERRORS.password.invalid)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(ZOD_ERRORS.confirmPassword.required)
    ).toBeInTheDocument();

    expect(handleSubmit).not.toHaveBeenCalled();
  });
  it('should show mismatch password error', async () => {
    const handleSubmit = jest.fn();

    render(
      <AuthForm
        formConfig={[
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'email', label: 'Email', type: 'text' },
          { name: 'password', label: 'Password', type: 'password' },
          {
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
          },
        ]}
        onSubmit={handleSubmit}
        typeForm={TypeForm.SignUp}
        formTitle="Sign Up"
        buttonText="Register"
      />
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Alex' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Password2!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(
      await screen.findByText(ZOD_ERRORS.confirmPassword.mismatch)
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
