'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import { AUTH_LINKS, CLIENT_LINKS } from '@/constants/links';
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
              {CLIENT_LINKS.map((link) => (
                <Button
                  key={link}
                  variant="contained"
                  component={Link}
                  href={`/${link}`}
                >
                  {t(`buttons.${link}`)}
                </Button>
              ))}
            </Stack>
          </>
        ) : (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              {t('greetings_unregistered')}
            </Typography>
            <Stack spacing={2} direction="row" sx={{ mt: 4 }}>
              {AUTH_LINKS.map((link) => (
                <Button
                  key={link}
                  variant="contained"
                  component={Link}
                  href={`/${link}`}
                >
                  {t(`buttons.${link}`)}
                </Button>
              ))}
            </Stack>
          </>
        )}
      </Box>
    </Container>
  );
}
