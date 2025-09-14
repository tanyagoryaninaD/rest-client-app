import '@/app/[locale]/client/client.css';

import { Container } from '@mui/material';

import FormRestClient from '@/components/forms/rest-client/form';

export default function Client() {
  return (
    <Container className="page-container">
      <FormRestClient />
    </Container>
  );
}
