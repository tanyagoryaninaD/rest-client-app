import { Button, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import Code from '@/components/forms/rest-client/request/code/code';
import Headers from '@/components/forms/rest-client/request/headers/headers';
import SelectMethod from '@/components/forms/rest-client/request/select-method';
import TextFieldURL from '@/components/forms/rest-client/request/text-field-url';
import type { UseFormProps } from '@/types/components/rest-client';

export default function RestClientRequest(props: UseFormProps) {
  const t = useTranslations('rest-client.request');

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h5" component="h1" gutterBottom>
        {t('title')}
      </Typography>
      <Stack
        spacing={2}
        direction="row"
        sx={{ width: '100%', maxWidth: '50rem', alignItems: 'flex-end' }}
      >
        <SelectMethod register={props.register} />
        <TextFieldURL register={props.register} />
        <Button variant="contained" sx={{ height: '3.5rem' }} type="submit">
          {t('send')}
        </Button>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%', maxWidth: '50rem' }}>
        <Headers />
      </Stack>
      <Stack spacing={2} sx={{ width: '100%', maxWidth: '50rem' }}>
        <Code />
      </Stack>
    </Stack>
  );
}
