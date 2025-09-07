import { Box, Typography } from '@mui/material';

import ResponseBody from './body';
import StatusCode from './status-code';

export default function RestClientResponse() {
  return (
    <Box className="client-section">
      <Typography variant="h5" component="h1" gutterBottom>
        Response
      </Typography>
      <Box className="client-box">
        <StatusCode />
      </Box>
      <Box className="client-box">
        <ResponseBody />
      </Box>
    </Box>
  );
}
