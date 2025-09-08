import { Box, InputLabel, TextField } from '@mui/material';

import type { ResponseBodyProps } from '@/types/components/rest-client';

export default function ResponseBody(props: ResponseBodyProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <InputLabel
          sx={{ textWrap: 'nowrap', width: '8rem' }}
          htmlFor="response-body-input"
        >
          Body:{' '}
        </InputLabel>
        <TextField
          className="readonly-textarea"
          sx={{
            width: '100%',
          }}
          multiline
          fullWidth
          value={props.body ? JSON.stringify(props.body) : props.body}
          placeholder="Read-Only JSON Viewer"
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
