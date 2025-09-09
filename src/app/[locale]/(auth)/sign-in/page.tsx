'use client';

import { Container } from '@mui/material';
import { useTranslations } from 'next-intl';

import withAuth from '@/components/auth/with-auth';
import AuthForm from '@/components/forms/AuthForm';
import PublicRoute from '@/components/routes/PublicRoute';
import { signInFormConfig } from '@/configs/auth';
import { useAppDispatch } from '@/hooks/redux';
import { useRouter } from '@/i18n/navigation';
import { setUser } from '@/store/slicers/userSlicer';
import type { SignInSignUpValues } from '@/types/authForms';
import { TypeForm } from '@/types/enums/authForms';
import { userLogin } from '@/utils/firebase/auth';

function SignInPage() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSubmit = async (data: SignInSignUpValues) => {
    const user = await userLogin(data, t);
    if (!user) {
      return;
    }
    dispatch(setUser(user));
    router.push('/');
  };
  return (
    <PublicRoute>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AuthForm
          formConfig={signInFormConfig}
          onSubmit={handleSubmit}
          typeForm={TypeForm.SignIn}
        />
      </Container>
    </PublicRoute>
  );
}

export default withAuth(SignInPage, { reverseCondition: true });
