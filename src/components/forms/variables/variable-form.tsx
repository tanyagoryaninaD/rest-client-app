import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import type { VariableFormFields } from '@/types/variables';
import { VariableFormSchema } from '@/zod/variables-schema';

interface AddVariableFormProps {
  saveVariable: SubmitHandler<VariableFormFields>;
}

export default function VariableForm({ saveVariable }: AddVariableFormProps) {
  const t = useTranslations('variables');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(VariableFormSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<VariableFormFields> = (data) => {
    saveVariable(data);
    reset();
  };

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <Stack direction="row" gap={2} flexWrap="wrap" justifyContent="center">
        <TextField
          size="small"
          label={t('name')}
          variant="standard"
          helperText={errors.name?.message ? t(errors.name.message) : ''}
          error={!!errors.name}
          {...register('name')}
        />
        <TextField
          size="small"
          label={t('value')}
          variant="standard"
          helperText={errors.value?.message ? t(errors.value.message) : ''}
          error={!!errors.value}
          {...register('value')}
        />
        <Stack
          justifyContent="center"
          alignItems="center"
          flexBasis={{ xs: '100%', sm: 'auto' }}
        >
          <Button
            color="inherit"
            size="small"
            disabled={!isValid}
            variant="outlined"
            type="submit"
          >
            {t('add_variable')}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
