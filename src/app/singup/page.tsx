'use client';

import SingUpForm from '@/components/forms/AuthForm';
import { singUpFormConfig } from '@/configs/auth';
import { AuthFormElements } from '@/constants';
import { userRegistr } from '@/utils/firebase/auth';
import { Container } from '@mui/material';

export default function RegistPage() {
  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SingUpForm
        formConfig={singUpFormConfig}
        onSubmit={userRegistr}
        formTitle={AuthFormElements.SingUpButton}
        buttonText={AuthFormElements.SingUpButton}
      />
    </Container>
  );
}
