'use client';

import { Container } from '@mui/material';
import { useTranslations } from 'next-intl';

import AuthForm from '@/components/forms/AuthForm';
import { signUpFormConfig } from '@/configs/auth';
import type { SignInSignUpValues } from '@/types/authForms';
import { TypeForm } from '@/types/enums/authForms';
import { userRegister } from '@/utils/firebase/auth';

export default function SignUpPage() {
  const t = useTranslations();
  const handleSubmit = async (data: SignInSignUpValues) => {
    await userRegister(data, t);
  };
  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AuthForm
        formConfig={signUpFormConfig}
        onSubmit={handleSubmit}
        typeForm={TypeForm.SignUp}
      />
    </Container>
  );
}
