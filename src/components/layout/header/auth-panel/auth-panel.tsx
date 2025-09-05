import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTranslations } from 'next-intl';

import { NavLink } from '@/components/elements/nav-link/nav-link';
import { usePathname } from '@/i18n/navigation';

interface AuthPanelProps {
  user?: { name: string };
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

const AUTH_NAV_LINKS = ['sign-in', 'sign-up'];

export default function AuthPanel({
  user,
  isSidebarOpen,
  closeSidebar,
}: AuthPanelProps) {
  const t = useTranslations('home_general');
  const pathname = usePathname();

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
            {t('buttons.sign-out')}
          </Typography>
        </Button>
      ) : (
        <>
          {AUTH_NAV_LINKS.map((href) => (
            <NavLink
              key={href}
              href={href}
              pathname={pathname}
              t={t}
              closeSidebar={closeSidebar}
            />
          ))}
        </>
      )}
    </ButtonGroup>
  );
}
