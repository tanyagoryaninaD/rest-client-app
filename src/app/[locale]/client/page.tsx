import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import PrivateRoute from '@/components/routes/PrivateRoute';

export default function ClientPage() {
  return (
    <PrivateRoute>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          REST Client Page
        </Typography>
        <Typography>Main Interface Here</Typography>
      </Container>
    </PrivateRoute>
  );
}
