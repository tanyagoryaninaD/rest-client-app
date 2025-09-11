import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';

import type { GenerateCodeProps } from '@/types/components/rest-client';

export default function GenerateCode(props: GenerateCodeProps) {
  const t = useTranslations('rest-client.request.buttons');
  const { generatedCode, handleGenerateCode, handleCopyCode } = props;

  return (
    <Stack>
      <Stack spacing={2} direction={'row'}>
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
      </Stack>
    </Stack>
  );
}
