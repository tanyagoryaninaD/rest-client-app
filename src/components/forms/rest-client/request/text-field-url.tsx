import { Box, InputLabel, TextField } from '@mui/material';

import { CLIENT_FORM } from '@/constants/rest-client';
import type { UseFormProps } from '@/types/components/rest-client';

export default function TextFieldURL(props: UseFormProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <InputLabel htmlFor="url-textfield">Endpoint URL</InputLabel>
      <TextField
        variant="outlined"
        placeholder="https://example.com/api/some-path"
        sx={{ width: '100%' }}
        slotProps={{
          input: {
            id: 'url-textfield',
          },
        }}
        {...props.register(CLIENT_FORM.url)}
      />
    </Box>
  );
}
