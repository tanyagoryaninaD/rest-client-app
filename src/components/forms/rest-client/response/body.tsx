import { TextField } from '@mui/material';
import { useTranslations } from 'next-intl';

import type { ResponseBodyProps } from '@/types/components/rest-client';

export default function ResponseBody(props: ResponseBodyProps) {
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
      label={t('labels.body')}
      value={props.body ? JSON.stringify(props.body) : t('placeholders.body')}
      placeholder={t('placeholders.body')}
      slotProps={{
        input: {
          id: 'response-body-input',
          readOnly: true,
          maxRows: '10',
          sx: {
            fontFamily: props.body ? 'inherit' : 'monospace',
            color: props.body
              ? 'inherit'
              : 'var(--mui-palette-text-secondary);',
          },
        },
      }}
    />
  );
}
