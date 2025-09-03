'use client';

import { Container } from '@mui/material';

import AuthForm from '@/components/forms/AuthForm';
import { singUpFormConfig } from '@/configs/auth';
import { SingUpFormElements } from '@/constants/forms';
import { userRegistr } from '@/utils/firebase/auth';

export default function SingUpPage() {
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
        formConfig={singUpFormConfig}
        onSubmit={userRegistr}
        formTitle={SingUpFormElements.Title}
        buttonText={SingUpFormElements.SubmitButton}
        isSingUpForm={true}
      />
    </Container>
  );
}
