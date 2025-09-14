import { Box, MenuItem, Select } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { CLIENT_FORM, DEFAULT_GENERATOR } from '@/constants/rest-client';
import type { ClientFormStateProps } from '@/types/components/rest-client';
import { getGeneratorsOptions } from '@/utils/handlers/clientForm';

export default function SelectGenerator() {
  const { register } = useFormContext<ClientFormStateProps>();

  return (
    <Box>
      <Select
        sx={{ width: '15rem' }}
        slotProps={{
          input: {
            id: 'generator-select',
            sx: { padding: '0.5rem' },
          },
        }}
        defaultValue={`${DEFAULT_GENERATOR.language} - ${DEFAULT_GENERATOR.variant}`}
        {...register(CLIENT_FORM.generator)}
      >
        {getGeneratorsOptions().map((generator) => (
          <MenuItem key={generator} value={generator}>
            {generator}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
