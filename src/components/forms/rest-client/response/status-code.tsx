import { Box, InputLabel, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';

import type { StatusCodeProps } from '@/types/components/rest-client';

export default function StatusCode(props: StatusCodeProps) {
  const t = useTranslations('rest-client.response');

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        className="status-code"
        sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
      >
        <InputLabel
          sx={{ textWrap: 'nowrap', width: '8rem' }}
          htmlFor="status-code-input"
        >
          {t('labels.status')}
        </InputLabel>
        <TextField
          className="readonly-textarea"
          sx={{
            width: '100%',
          }}
          multiline
          fullWidth
          value={props.status}
          placeholder={t('placeholders.status')}
          slotProps={{
            input: {
              id: 'status-code-input',
              readOnly: true,
              sx: { fontFamily: 'monospace' },
            },
          }}
        />
      </Box>
    </Box>
  );
}
