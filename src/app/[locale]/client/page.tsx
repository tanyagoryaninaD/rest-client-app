import '@/app/[locale]/client/client.css';

import { Container } from '@mui/material';

import RestClientRequest from '@/components/forms/rest-client/request/rest-client-request';
import RestClientResponse from '@/components/forms/rest-client/response/rest-client-response';

export default function ClientPage() {
  return (
    <Container className="page-container">
      <RestClientRequest />
      <RestClientResponse />
    </Container>
  );
}
