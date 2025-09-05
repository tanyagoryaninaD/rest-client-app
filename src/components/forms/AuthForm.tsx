import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import type { SignInSignUpValues } from '@/types/authForms';
import type { InputProps } from '@/types/elements/input';
import type { TypeForm } from '@/types/enums/authForms';
import { useAuthFormValidator } from '@/zod/authFormSchema';

import FormFields from './renderFields';

interface AuthFormProps {
  formConfig: InputProps[];
  onSubmit: (data: SignInSignUpValues) => Promise<void>;
  typeForm: TypeForm;
}

function AuthForm({ formConfig, typeForm, onSubmit }: AuthFormProps) {
  const t = useTranslations('authForms');
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignInSignUpValues>({
    resolver: zodResolver(useAuthFormValidator(typeForm)),
    mode: 'onChange',
  });

  const onSubmitForm = async (data: SignInSignUpValues): Promise<void> => {
    await onSubmit(data);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={(e) => void handleSubmit(onSubmitForm)(e)}
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
        {t(`${typeForm}.title`)}
      </Typography>
      <FormFields
        formConfig={formConfig}
        register={register}
        hookFormErrors={errors}
        typeForm={typeForm}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!isValid}
      >
        {t(`${typeForm}.submit`)}
      </Button>
    </Box>
  );
}

export default AuthForm;
