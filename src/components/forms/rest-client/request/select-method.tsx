import { Box, InputLabel, MenuItem, Select } from '@mui/material';

import { CLIENT_FORM, METHODS } from '@/constants/rest-client';
import type { UseFormProps } from '@/types/components/rest-client';

export default function SelectMethod(props: UseFormProps) {
  return (
    <Box>
      <InputLabel htmlFor="method-select">Method</InputLabel>
      <Select
        defaultValue={METHODS[0]}
        sx={{ width: '8rem' }}
        slotProps={{
          input: {
            id: 'method-select',
          },
        }}
        {...props.register(CLIENT_FORM.method)}
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
