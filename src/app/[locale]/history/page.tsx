import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import PrivateRoute from '@/components/routes/PrivateRoute';

export default function HistoryPage() {
  return (
    <PrivateRoute>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          History Page
        </Typography>
        <Typography>History and Analytics Here</Typography>
      </Container>
    </PrivateRoute>
  );
}
