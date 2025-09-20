'use client';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import { AUTH_LINKS, CLIENT_LINKS } from '@/constants/links';
import { Link } from '@/i18n/navigation';

interface HomePageClientProps {
  currentUser: string;
  isNewUser: boolean;
}
export default function HomePageClient({
  currentUser,
  isNewUser,
}: HomePageClientProps) {
  const t = useTranslations('home_general');

  return (
    <Container>
      <Stack
        direction="column"
        sx={{
          my: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {currentUser ? (
          <>
            {currentUser ? (
              <Typography variant="h4" component="h1" gutterBottom>
                {isNewUser
                  ? t('greetings_firstRegistered', { name: currentUser })
                  : t('greetings_registered', { name: currentUser })}
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
      </Stack>
    </Container>
  );
}
