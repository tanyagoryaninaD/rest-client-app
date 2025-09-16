import { TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { CLIENT_FORM } from '@/constants/rest-client';
import type { ClientFormStateProps } from '@/types/components/rest-client';

export default function TextFieldURL() {
  const t = useTranslations('rest-client.request.labels');
  const { register } = useFormContext<ClientFormStateProps>();

  return (
    <TextField
      variant="outlined"
      label={t('url')}
      placeholder="https://example.com/api/some-path"
      sx={{ width: '100%' }}
      {...register(CLIENT_FORM.url)}
    />
  );
}
