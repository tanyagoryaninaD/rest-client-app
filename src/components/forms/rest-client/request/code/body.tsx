import { Box, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';

import type { BodyProps } from '@/types/components/rest-client';

export default function Body(props: BodyProps) {
  const t = useTranslations('rest-client.request.placeholders');
  const { generatedCode } = props;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <TextField
          sx={{ width: '100%' }}
          multiline
          fullWidth
          placeholder={`${t('body')} ${generatedCode}`} // TODO delete generatedCode
          slotProps={{
            input: {
              id: 'generate-input',
              sx: { fontFamily: 'monospace' },
            },
          }}
        />
      </Box>
    </Box>
  );
}
