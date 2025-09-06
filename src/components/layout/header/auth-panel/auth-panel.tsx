import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTranslations } from 'next-intl';

import { NavLink } from '@/components/elements/nav-link/nav-link';
import { AUTH_LINKS } from '@/constants/links';
// import { useAppDispatch } from '@/hooks/redux';
import { usePathname } from '@/i18n/navigation';
import type { AppUser } from '@/types/userData';
// import { userLogout } from '@/utils/firebase/auth';

interface AuthPanelProps {
  user?: AppUser | null;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

export default function AuthPanel({
  user,
  isSidebarOpen,
  closeSidebar,
}: AuthPanelProps) {
  const t = useTranslations('home_general');
  const pathname = usePathname();

  // const tToast = useTranslations('toast');
  // const dispatch = useAppDispatch();
  // const handleSignOut = async () => {
  //   await userLogout(tToast, dispatch);
  //   closeSidebar();
  // };

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
        // <Button onClick={() => void handleSignOut()} sx={{ px: 2 }}>
        <Button sx={{ px: 2 }}>
          <Typography color="var(--foreground)">
            {t('buttons.sign-out')}
          </Typography>
        </Button>
      ) : (
        <>
          {AUTH_LINKS.map((href) => (
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
