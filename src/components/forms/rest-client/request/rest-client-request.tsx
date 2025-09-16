import { Button, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import GenerateCode from '@/components/forms/rest-client/request/generate-code/generate-code';
import Headers from '@/components/forms/rest-client/request/headers/headers';
import SelectMethod from '@/components/forms/rest-client/request/select-method';
import TextFieldURL from '@/components/forms/rest-client/request/text-field-url';
import type { ClientFormStateProps } from '@/types/components/rest-client';

import Body from './body';

export default function RestClientRequest() {
  const t = useTranslations('rest-client.request');
  const { watch } = useFormContext<ClientFormStateProps>();

  return (
    <Stack spacing={2} alignItems="center" gap={'1rem'}>
      <Typography variant="h5" component="h1" gutterBottom>
        {t('title')}
      </Typography>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          width: '100%',
          maxWidth: '50rem',
          alignItems: 'flex-end',
        }}
      >
        <SelectMethod />
        <TextFieldURL />
        <Button
          variant="contained"
          sx={{ height: '3.5rem' }}
          type="submit"
          disabled={!watch('url')}
        >
          {t('send')}
        </Button>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%', maxWidth: '50rem' }}>
        <Headers />
      </Stack>
      <Stack spacing={2} sx={{ width: '100%', maxWidth: '50rem' }}>
        <Body />
      </Stack>
      <Stack spacing={2} sx={{ width: '100%', maxWidth: '50rem' }}>
        <GenerateCode />
      </Stack>
    </Stack>
  );
}
