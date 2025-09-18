import { TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useDeferredValue } from 'react';

import Loading from '@/components/layout/loader/loader';
import type { GenerateCodeResultProps } from '@/types/components/rest-client';

export default function GenerateCodeResult(props: GenerateCodeResultProps) {
  const t = useTranslations('rest-client.request');
  const { generatedCode, isPending } = props;
  const deferredQuery = useDeferredValue(generatedCode);

  return isPending && !generatedCode ? (
    <Loading />
  ) : (
    <TextField
      sx={{ width: '100%' }}
      multiline
      fullWidth
      label={t('labels.snippet')}
      value={deferredQuery}
      data-testid="request-generator-snippet"
      slotProps={{
        input: {
          sx: { fontFamily: 'monospace' },
        },
      }}
    />
  );
}
