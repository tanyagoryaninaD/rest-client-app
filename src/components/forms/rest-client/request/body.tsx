import { TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { CLIENT_FORM } from '@/constants/rest-client';
import type { ClientFormStateProps } from '@/types/components/rest-client';

export default function Body() {
  const t = useTranslations('rest-client.request');
  const { register } = useFormContext<ClientFormStateProps>();

  return (
    <TextField
      sx={{ width: '100%' }}
      multiline
      fullWidth
      label={t('labels.body')}
      placeholder={t('placeholders.body')}
      data-testid="request-body"
      slotProps={{
        input: {
          id: 'request-body',
          sx: { fontFamily: 'monospace' },
        },
      }}
      {...register(CLIENT_FORM.body)}
    />
  );
}
