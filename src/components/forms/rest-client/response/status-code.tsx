import { Box, InputLabel, TextField } from '@mui/material';

export default function StatusCode() {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <InputLabel sx={{ textWrap: 'nowrap', width: '8rem' }}>
          Status code:{' '}
        </InputLabel>
        <TextField
          id="generate-input"
          sx={{
            width: '100%',
            ':focus': { outline: 0 },
          }}
          multiline
          fullWidth
          value={'HTTP Status Code'}
        />
      </Box>
    </Box>
  );
}
