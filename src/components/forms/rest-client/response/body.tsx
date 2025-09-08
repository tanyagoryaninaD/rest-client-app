import { Box, InputLabel, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';

import type { ResponseBodyProps } from '@/types/components/rest-client';

export default function ResponseBody(props: ResponseBodyProps) {
  const t = useTranslations('rest-client.response');

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <InputLabel
          sx={{ textWrap: 'nowrap', width: '8rem' }}
          htmlFor="response-body-input"
        >
          {t('labels.body')}
        </InputLabel>
        <TextField
          className="readonly-textarea"
          sx={{
            width: '100%',
          }}
          multiline
          fullWidth
          value={props.body ? JSON.stringify(props.body) : props.body}
          placeholder={t('placeholders.body')}
          slotProps={{
            input: {
              id: 'response-body-input',
              readOnly: true,
              maxRows: '10',
              sx: { fontFamily: 'monospace' },
            },
          }}
        />
      </Box>
    </Box>
  );
}
