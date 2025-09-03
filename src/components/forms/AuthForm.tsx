import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';

import type { InputProps, SingInSingUpValues } from '@/types/elements/input';
import { singInSchema, singUpShema } from '@/zod/authFormShema';

import FormFields from './renderFields';

interface AuthFormProps {
  formConfig: InputProps[];
  onSubmit: (data: SingInSingUpValues) => Promise<void>;
  formTitle?: string;
  buttonText?: string;
  isSingUpForm: boolean;
}

function AuthForm({
  formConfig,
  onSubmit,
  formTitle,
  buttonText,
  isSingUpForm,
}: AuthFormProps) {
  const currentShema = isSingUpForm ? singUpShema : singInSchema;
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SingInSingUpValues>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(currentShema),
    mode: 'onChange',
  });

  const onSubmitForm = async (data: SingInSingUpValues): Promise<void> => {
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
