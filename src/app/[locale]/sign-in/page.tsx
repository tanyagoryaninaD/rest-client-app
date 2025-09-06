'use client';

import { Container } from '@mui/material';
import { useTranslations } from 'next-intl';

import AuthForm from '@/components/forms/AuthForm';
import { signInFormConfig } from '@/configs/auth';
import { useAppDispatch } from '@/hooks/redux';
import type { SignInSignUpValues } from '@/types/authForms';
import { TypeForm } from '@/types/enums/authForms';
import { userLogin } from '@/utils/firebase/auth';

export default function SignInPage() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const handleSubmit = async (data: SignInSignUpValues) => {
    await userLogin(data, t, dispatch);
    // TODO: Add redirect to main page
  };
  return (
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
  );
}
