import { Box, Typography } from '@mui/material';

import Code from '@/components/forms/rest-client/request/code/code';
import Headers from '@/components/forms/rest-client/request/headers/headers';
import SelectMethod from '@/components/forms/rest-client/request/select-method';
import TextFieldURL from '@/components/forms/rest-client/request/text-field-url';

export default function RestClientRequest() {
  return (
    <Box className="client-section">
      <Typography variant="h5" component="h1" gutterBottom>
        REST Client
      </Typography>
      <Box className="client-box">
        <SelectMethod />
        <TextFieldURL />
      </Box>
      <Box className="client-box">
        <Headers />
      </Box>
      <Box className="client-box">
        <Code />
      </Box>
    </Box>
  );
}
