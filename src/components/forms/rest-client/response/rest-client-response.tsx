import { Box, Typography } from '@mui/material';

import type { ClientResponseStateProps } from '@/types/components/rest-client';

import ResponseBody from './body';
import StatusCode from './status-code';

export default function RestClientResponse(props: ClientResponseStateProps) {
  const { status, body } = props;

  return (
    <Box className="client-section">
      <Typography variant="h5" component="h1" gutterBottom>
        Response
      </Typography>
      <Box className="client-box">
        <StatusCode status={status} />
      </Box>
      <Box className="client-box">
        <ResponseBody body={body} />
      </Box>
    </Box>
  );
}
