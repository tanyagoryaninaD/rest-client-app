import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslations } from 'next-intl';

import { CLIENT_FORM, METHODS } from '@/constants/rest-client';
import type { UseFormProps } from '@/types/components/rest-client';

export default function SelectMethod(props: UseFormProps) {
  const t = useTranslations('rest-client.request.labels');

  return (
    <Box>
      <InputLabel htmlFor="method-select">{t('method')}</InputLabel>
      <Select
        defaultValue={METHODS[0]}
        sx={{ width: '8rem' }}
        slotProps={{
          input: {
            id: 'method-select',
          },
        }}
        {...props.register(CLIENT_FORM.method)}
      >
        {METHODS.map((method) => (
          <MenuItem key={method} value={method}>
            {method.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
