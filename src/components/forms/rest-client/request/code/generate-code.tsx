import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';

import type { GenerateCodeProps } from '@/types/components/rest-client';

export default function GenerateCode(props: GenerateCodeProps) {
  const t = useTranslations('rest-client.request.buttons');
  const { generatedCode, handleGenerateCode, handleCopyCode } = props;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Button variant="contained" onClick={handleGenerateCode}>
          {t('generate')}
        </Button>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyCode}
          disabled={!generatedCode}
        >
          {t('copy')}
        </Button>
      </Box>
    </Box>
  );
}
