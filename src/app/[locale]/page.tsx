'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import { AUTH_LINKS, CLIENT_LINKS } from '@/constants/links';
import { useAppSelector } from '@/hooks/redux';
import { Link } from '@/i18n/navigation';
import { isTokenValid } from '@/utils/firebase/tokenValidation';

export default function Home() {
  const t = useTranslations('home_general');
  const { user, loading } = useAppSelector((state) => state.user);
  const isLoggedIn = Boolean(user) && isTokenValid(user?.expiresIn);

  if (loading) {
    return null;
  }

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
        {isLoggedIn ? (
          <>
            {user?.displayName ? (
              <Typography variant="h4" component="h1" gutterBottom>
                {user.isNewUser
                  ? t('greetings_firstRegistered', { name: user.displayName })
                  : t('greetings_registered', { name: user.displayName })}
              </Typography>
            ) : (
              <Typography variant="h4" component="h1" gutterBottom>
                {t('greetings_unregistered')}
              </Typography>
            )}
            <Stack spacing={2} direction="row" sx={{ mt: 6 }}>
              {CLIENT_LINKS.map((link) => (
                <Button
                  key={link}
                  variant="contained"
                  component={Link}
                  href={`/${link}`}
                  data-testid={`link-${link}`}
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
                  data-testid={`link-${link}`}
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
