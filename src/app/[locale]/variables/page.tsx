import { Container, Typography } from '@mui/material';

import PrivateRoute from '@/components/routes/PrivateRoute';

export default function VariablesPage() {
  return (
    <PrivateRoute>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Variables Page
        </Typography>
        <Typography>User Variables Here</Typography>
      </Container>
    </PrivateRoute>
  );
}
