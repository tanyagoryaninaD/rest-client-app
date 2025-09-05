'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Link } from '@/i18n/navigation';

export default function Home() {
  // TODO: Add user context
  const user = Math.random() > 0.5;

  return (
    <Container>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {user ? (
          <>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome Back, [Username]!
            </Typography>
            <Stack spacing={2} direction="row" sx={{ mt: 6 }}>
              <Button variant="contained" component={Link} href={'/client'}>
                REST Client
              </Button>
              <Button variant="contained" component={Link} href={'/history'}>
                History
              </Button>
              <Button variant="contained" component={Link} href={'/variables'}>
                Variables
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome!
            </Typography>
            <Stack spacing={2} direction="row" sx={{ mt: 4 }}>
              <Button variant="contained" component={Link} href={'/sign-in'}>
                Sign In
              </Button>
              <Button variant="outlined" component={Link} href={'/sign-up'}>
                Sign Up
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Container>
  );
}
