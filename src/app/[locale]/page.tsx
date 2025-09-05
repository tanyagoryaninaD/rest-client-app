'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export default function Home() {
  const t = useTranslations('home_general');

  // TODO: Add user context
  const user: { name: string } | undefined = { name: 'John' };

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
        {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
        {user ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              {user.name && t('greetings_registered', { name: user.name })}
            </Typography>
            <Stack spacing={2} direction="row" sx={{ mt: 6 }}>
              <Button variant="contained" component={Link} href={'/client'}>
                {t('buttons.client')}
              </Button>
              <Button variant="contained" component={Link} href={'/history'}>
                {t('buttons.history')}
              </Button>
              <Button variant="contained" component={Link} href={'/variables'}>
                {t('buttons.variables')}
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              {t('greetings_unregistered')}
            </Typography>
            <Stack spacing={2} direction="row" sx={{ mt: 4 }}>
              <Button variant="contained" component={Link} href={'/sign-in'}>
                {t('buttons.sign_in')}
              </Button>
              <Button variant="outlined" component={Link} href={'/sign-up'}>
                {t('buttons.sign_up')}
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Container>
  );
}
