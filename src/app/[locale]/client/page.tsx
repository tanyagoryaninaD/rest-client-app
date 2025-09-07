import '@/app/[locale]/client/client.css';

import { Box, Container, Typography } from '@mui/material';

import RestClientRequest from '@/components/forms/rest-client/request/rest-client-request';

export default function ClientPage() {
  return (
    <Container className="page-container">
      <RestClientRequest />
      <Box className="client-section">
        <Typography variant="h5" component="h1" gutterBottom>
          Response
        </Typography>
      </Box>
    </Container>
  );
}
