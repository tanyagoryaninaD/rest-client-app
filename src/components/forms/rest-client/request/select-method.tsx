import { MenuItem, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { CLIENT_FORM, METHODS } from '@/constants/rest-client';
import type { ClientFormStateProps } from '@/types/components/rest-client';

export default function SelectMethod({ disabled }: { disabled: boolean }) {
  const t = useTranslations('rest-client.request.labels');
  const { register, watch } = useFormContext<ClientFormStateProps>();

  return (
    <TextField
      disabled={disabled}
      select
      label={t('method')}
      sx={{ width: '10rem' }}
      data-testid="request-method"
      value={
        METHODS.includes(watch('method') as (typeof METHODS)[number])
          ? watch('method')
          : ''
      }
      {...register(CLIENT_FORM.method)}
    >
      {METHODS.map((method) => (
        <MenuItem key={method} value={method}>
          {method}
        </MenuItem>
      ))}
    </TextField>
  );
}
