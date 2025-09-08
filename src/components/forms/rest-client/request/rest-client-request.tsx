import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import Code from '@/components/forms/rest-client/request/code/code';
import Headers from '@/components/forms/rest-client/request/headers/headers';
import SelectMethod from '@/components/forms/rest-client/request/select-method';
import TextFieldURL from '@/components/forms/rest-client/request/text-field-url';
import type { UseFormProps } from '@/types/components/rest-client';

export default function RestClientRequest(props: UseFormProps) {
  const t = useTranslations('rest-client.request');

  return (
    <Box className="client-section">
      <Typography variant="h5" component="h1" gutterBottom>
        {t('title')}
      </Typography>
      <Box className="client-box" sx={{ alignItems: 'flex-end' }}>
        <SelectMethod register={props.register} />
        <TextFieldURL register={props.register} />
        <Button variant="contained" sx={{ height: '3.5rem' }} type="submit">
          {t('send')}
        </Button>
      </Box>
      <Box className="client-box">
        <Headers />
      </Box>
      <Box className="client-box">
        <Code />
      </Box>
    </Box>
  );
}
