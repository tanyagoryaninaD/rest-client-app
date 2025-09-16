import { TextField } from '@mui/material';
import { useTranslations } from 'next-intl';

import type { GenerateCodeResultProps } from '@/types/components/rest-client';

export default function GenerateCodeResult(props: GenerateCodeResultProps) {
  const t = useTranslations('rest-client.request');
  const { generatedCode, isPending } = props;

  return (
    <TextField
      sx={{ width: '100%' }}
      multiline
      fullWidth
      label={t('labels.snippet')}
      value={isPending ? '' : generatedCode}
      slotProps={{
        input: {
          sx: { fontFamily: 'monospace' },
        },
      }}
    />
  );
}
