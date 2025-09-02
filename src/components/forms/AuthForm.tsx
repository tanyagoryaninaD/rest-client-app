import { type JSX } from 'react';
import { useForm } from 'react-hook-form';
import FormFields from './renderFields';
import Button from '@mui/material/Button';
import { InputProps, SingInSingUpValues } from '@/types/elements/input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type AuthFormProps = {
  formConfig: InputProps[];
  onSubmit: (data: SingInSingUpValues) => void;
  formTitle?: string;
  buttonText?: string;
};

function AuthForm({
  formConfig,
  onSubmit,
  formTitle,
  buttonText,
}: AuthFormProps): JSX.Element {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SingInSingUpValues>({ mode: 'onChange' });

  const onSubmitForm = async (data: SingInSingUpValues): Promise<void> => {
    if (!isValid) return;
    onSubmit(data);
    console.log('Form data:', data);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmitForm)}
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
