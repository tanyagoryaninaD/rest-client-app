import { Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import type { ClientResponseStateProps } from '@/types/components/rest-client';

import ResponseBody from './body';
import StatusCode from './status-code';

export default function RestClientResponse(props: ClientResponseStateProps) {
  const t = useTranslations('rest-client.response');

  const { status, body } = props;

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h5" component="h1" gutterBottom>
        {t('title')}
      </Typography>
      <Stack spacing={2} sx={{ width: '100%', maxWidth: '50rem' }}>
        <StatusCode status={status} />
      </Stack>
      <Stack spacing={2} sx={{ width: '100%', maxWidth: '50rem' }}>
        <ResponseBody body={body} />
      </Stack>
    </Stack>
  );
}
