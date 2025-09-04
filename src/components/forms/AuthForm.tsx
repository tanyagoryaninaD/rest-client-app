import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';

import type { SignInSignUpValues } from '@/types/authForms';
import type { InputProps } from '@/types/elements/input';
import type { TypeForm } from '@/types/enums/authForms';
import { authFormValidator } from '@/zod/authFormSchema';

import FormFields from './renderFields';

interface AuthFormProps {
  formConfig: InputProps[];
  onSubmit: (data: SignInSignUpValues) => Promise<void>;
  typeForm: TypeForm;
  formTitle?: string;
  buttonText?: string;
}

function AuthForm({
  formConfig,
  typeForm,
  onSubmit,
  formTitle,
  buttonText,
}: AuthFormProps) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignInSignUpValues>({
    resolver: zodResolver(authFormValidator(typeForm)),
    mode: 'onChange',
  });

  const onSubmitForm = async (data: SignInSignUpValues): Promise<void> => {
    if (!isValid) return;
    await onSubmit(data);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={() => handleSubmit(onSubmitForm)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        width: 400,
        mx: 'auto',
        padding: '1rem',
        background: '#f5f5f5',
      }}
    >
      <Typography variant="h5" component="h1" align="left" sx={{ mb: 1 }}>
        {formTitle}
      </Typography>
      <FormFields
        formConfig={formConfig}
        register={register}
        hookFormErrors={errors}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!isValid}
      >
        {buttonText}
      </Button>
    </Box>
  );
}

export default AuthForm;
