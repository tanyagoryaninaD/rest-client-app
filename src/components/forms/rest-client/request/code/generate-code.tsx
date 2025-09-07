import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button } from '@mui/material';

import type { GenerateCodeProps } from '@/types/components/rest-client';

export default function GenerateCode(props: GenerateCodeProps) {
  const { generatedCode, handleGenerateCode, handleCopyCode } = props;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Button variant="contained" onClick={handleGenerateCode}>
          Generate Code
        </Button>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyCode}
          disabled={!generatedCode}
        >
          Copy
        </Button>
      </Box>
    </Box>
  );
}
