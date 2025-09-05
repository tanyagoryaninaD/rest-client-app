import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

interface AuthPanelProps {
  user?: { name: string };
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

export default function AuthPanel({
  user,
  isSidebarOpen,
  closeSidebar,
}: AuthPanelProps) {
  const t = useTranslations('home_general');

  return (
    <ButtonGroup
      sx={{
        display: isSidebarOpen ? 'flex' : { xs: 'none', md: 'flex' },
        flexDirection: isSidebarOpen ? 'column' : 'row',
        gap: 1,
      }}
      size="small"
      variant="text"
    >
      {user ? (
        <Button onClick={closeSidebar} sx={{ px: 2 }}>
          <Typography color="var(--foreground)">
            {t('buttons.sign_out')}
          </Typography>
        </Button>
      ) : (
        <>
          <Button
            onClick={closeSidebar}
            sx={{ px: 2 }}
            href="./sign-in"
            LinkComponent={Link}
          >
            <Typography color="var(--foreground)">
              {t('buttons.sign_in')}
            </Typography>
          </Button>
          <Button
            onClick={closeSidebar}
            sx={{ px: 2 }}
            href="./sign-up"
            LinkComponent={Link}
          >
            <Typography color="var(--foreground)">
              {t('buttons.sign_up')}
            </Typography>
          </Button>
        </>
      )}
    </ButtonGroup>
  );
}
