import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { CLIENT_FORM, METHODS } from '@/constants/rest-client';
import type { ClientFormStateProps } from '@/types/components/rest-client';

export default function SelectMethod() {
  const t = useTranslations('rest-client.request.labels');
  const { register } = useFormContext<ClientFormStateProps>();

  return (
    <Box>
      <InputLabel htmlFor="method-select">{t('method')}</InputLabel>
      <Select
        sx={{ width: '8rem' }}
        slotProps={{
          input: {
            id: 'method-select',
          },
        }}
        defaultValue={METHODS[0]}
        {...register(CLIENT_FORM.method)}
      >
        {METHODS.map((method) => (
          <MenuItem key={method} value={method}>
            {method}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
