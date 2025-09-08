import { Box, InputLabel, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';

import { CLIENT_FORM } from '@/constants/rest-client';
import type { UseFormProps } from '@/types/components/rest-client';

export default function TextFieldURL(props: UseFormProps) {
  const t = useTranslations('rest-client.request.labels');

  return (
    <Box sx={{ width: '100%' }}>
      <InputLabel htmlFor="url-textfield">{t('url')}</InputLabel>
      <TextField
        variant="outlined"
        placeholder="https://example.com/api/some-path"
        sx={{ width: '100%' }}
        slotProps={{
          input: {
            id: 'url-textfield',
          },
        }}
        {...props.register(CLIENT_FORM.url)}
      />
    </Box>
  );
}
