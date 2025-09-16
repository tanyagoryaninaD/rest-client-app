import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import type {
  ClientFormStateProps,
  GenerateCodeProps,
} from '@/types/components/rest-client';

import SelectGenerator from './select-generation';

export default function GenerateCodeButtons(props: GenerateCodeProps) {
  const t = useTranslations('rest-client.request.buttons');
  const { isPending, generatedCode, handleGenerateCode, handleCopyCode } =
    props;
  const { watch } = useFormContext<ClientFormStateProps>();

  return (
    <Stack spacing={2} direction={'row'} flexWrap={'wrap'} rowGap={'1rem'}>
      <SelectGenerator />
      <Button
        variant="contained"
        onClick={handleGenerateCode}
        disabled={isPending || !watch('url')}
        data-testid="request-generator-button"
      >
        {t('generate')}
      </Button>
      <Button
        variant="outlined"
        startIcon={<ContentCopyIcon />}
        onClick={() => {
          void handleCopyCode();
        }}
        disabled={isPending || !generatedCode}
        data-testid="request-generator-copy"
      >
        {t('copy')}
      </Button>
    </Stack>
  );
}
