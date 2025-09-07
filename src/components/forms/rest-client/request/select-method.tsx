import { Box, InputLabel, MenuItem, Select } from '@mui/material';

import { METHODS } from '@/constants/rest-client';

export default function SelectMethod() {
  return (
    <Box>
      <InputLabel htmlFor="method-select-label">Method</InputLabel>
      <Select
        id="method-select-label"
        defaultValue={METHODS[0]}
        sx={{ width: '8rem' }}
      >
        {METHODS.map((method) => (
          <MenuItem key={method} value={method}>
            {method.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
