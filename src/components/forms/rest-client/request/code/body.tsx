import { Box, TextField } from '@mui/material';

import type { BodyProps } from '@/types/components/rest-client';

export default function Body(props: BodyProps) {
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
          placeholder={`Click on 'Generate Code' to create the code ${generatedCode}`} // TODO delete generatedCode
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
