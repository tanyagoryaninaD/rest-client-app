import { Box, InputLabel, TextField } from '@mui/material';

export default function TextFieldURL() {
  return (
    <Box sx={{ width: '100%' }}>
      <InputLabel htmlFor="url-textfield-label">Endpoint URL</InputLabel>
      <TextField
        id="url-textfield-input"
        variant="outlined"
        placeholder="https://example.com/api/some-path"
        sx={{ width: '100%' }}
      />
    </Box>
  );
}
