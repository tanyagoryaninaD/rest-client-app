'use client';

import { Container } from '@mui/material';

import AuthForm from '@/components/forms/AuthForm';
import { signUpFormConfig } from '@/configs/auth';
import { SignUpFormElements } from '@/constants/forms';
import { TypeForm } from '@/types/enums/authForms';
import { userRegister } from '@/utils/firebase/auth';

export default function SignUpPage() {
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
        onSubmit={userRegister}
        formTitle={SignUpFormElements.Title}
        buttonText={SignUpFormElements.SubmitButton}
        typeForm={TypeForm.SignUp}
      />
    </Container>
  );
}
