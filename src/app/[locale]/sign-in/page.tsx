'use client';

import { Container } from '@mui/material';

import AuthForm from '@/components/forms/AuthForm';
import { signInFormConfig } from '@/configs/auth';
import { SignInFormElements } from '@/constants/forms';
import { TypeForm } from '@/types/enums/authForms';
import { userLogin } from '@/utils/firebase/auth';

export default function SignInPage() {
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
        formConfig={signInFormConfig}
        onSubmit={userLogin}
        formTitle={SignInFormElements.Title}
        buttonText={SignInFormElements.SubmitButton}
        typeForm={TypeForm.SignIn}
      />
    </Container>
  );
}
