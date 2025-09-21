import { TextField } from '@mui/material';
import { useTranslations } from 'next-intl';

import type { StatusCodeProps } from '@/types/components/rest-client';

export default function StatusCode(props: StatusCodeProps) {
  const t = useTranslations('rest-client.response');

  return (
    <TextField
      className="readonly-textarea"
      sx={{
        width: '100%',
        pointerEvents: 'none',
      }}
      multiline
      fullWidth
      value={props.status ?? t('placeholders.status')}
      label={t('labels.status')}
      placeholder={t('placeholders.status')}
      slotProps={{
        input: {
          readOnly: true,
          sx: {
            fontFamily: props.status ? 'inherit' : 'monospace',
            color: props.status
              ? 'inherit'
              : 'var(--mui-palette-text-secondary);',
          },
        },
      }}
    />
  );
}
