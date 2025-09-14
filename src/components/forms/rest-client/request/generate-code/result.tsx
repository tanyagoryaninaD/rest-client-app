import { Box, TextField } from '@mui/material';

import type { GenerateCodeResultProps } from '@/types/components/rest-client';

export default function GenerateCodeResult(props: GenerateCodeResultProps) {
  const { generatedCode, isPending } = props;

  return (
    <Box>
      <TextField
        sx={{ width: '100%' }}
        multiline
        fullWidth
        value={isPending ? '' : generatedCode}
        slotProps={{
          input: {
            sx: { fontFamily: 'monospace' },
          },
        }}
      />
    </Box>
  );
}
