import { MenuItem, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { CLIENT_FORM, DEFAULT_GENERATOR } from '@/constants/rest-client';
import type { ClientFormStateProps } from '@/types/components/rest-client';
import { getGeneratorsOptions } from '@/utils/handlers/clientForm';

export default function SelectGenerator() {
  const t = useTranslations('rest-client.request');
  const { register } = useFormContext<ClientFormStateProps>();

  return (
    <TextField
      select
      label={t('labels.generator')}
      sx={{ width: '15rem' }}
      defaultValue={`${DEFAULT_GENERATOR.language} - ${DEFAULT_GENERATOR.variant}`}
      {...register(CLIENT_FORM.generator)}
    >
      {getGeneratorsOptions().map((generator) => (
        <MenuItem key={generator} value={generator}>
          {generator}
        </MenuItem>
      ))}
    </TextField>
  );
}
