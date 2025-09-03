'use client';

import AuthForm from '@/components/forms/AuthForm';
import { singInFormConfig } from '@/configs/auth';
import { SingInFormElements } from '@/constants/forms';
import { userLogin } from '@/utils/firebase/auth';
import { Container } from '@mui/material';

export default function SingInPage() {
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
        formConfig={singInFormConfig}
        onSubmit={userLogin}
        formTitle={SingInFormElements.Title}
        buttonText={SingInFormElements.SubmitButton}
        isSingUpForm={false}
      />
    </Container>
  );
}
