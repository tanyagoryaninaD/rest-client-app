import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { IntlProvider } from 'next-intl';
import type { JSX } from 'react';
import { Provider } from 'react-redux';

import AuthForm from '@/components/forms/AuthForm';
import store from '@/store';
import type { InputProps } from '@/types/elements/input';
import { TypeForm } from '@/types/enums/authForms';
import { userLogin } from '@/utils/firebase/auth';

import SignInPage from './page';

jest.mock('@/utils/firebase/auth', () => ({
  userLogin: jest.fn(),
}));

const pushMock = jest.fn();
jest.mock('@/i18n/navigation', () => ({
  useRouter: jest.fn(() => ({ push: pushMock })),
}));

const mockUseIsLoggedIn = jest.fn();
jest.mock('@/hooks/use-user-logged-state', () => ({
  useUserLoggedState: () =>
    mockUseIsLoggedIn() as { isLoggedIn: boolean; isLoading: boolean },
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

const renderWithProvider = (component: JSX.Element) =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={messages}>
        {component}
      </IntlProvider>
    </Provider>
  );

describe('SignInPage (AuthForm)', () => {
  beforeAll(() => {
    mockUseIsLoggedIn.mockReturnValue({ isLoggedIn: false, isLoading: false });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render SignInPage ', async () => {
    renderWithProvider(<SignInPage />);
    const heading = await screen.findByRole('heading', { name: /Sign In/i });
    expect(heading).toBeInTheDocument();
  });

  it('should show errors for invalid data and keeps submit button disabled', async () => {
    const handleSubmit = jest.fn();
    renderWithProvider(
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

  it('should enables submit button and calls userLogin on submit', async () => {
    (userLogin as jest.Mock).mockResolvedValue({
      displayName: 'Alex',
      isNewUser: false,
      expiresIn: 3600,
    });

    renderWithProvider(<SignInPage />);

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
      expect(userLogin).toHaveBeenCalledWith(
        { email: 'test@example.com', password: 'qwQW21!@' },
        expect.any(Function)
      );
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });
});
