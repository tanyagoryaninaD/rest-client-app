import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import MuiLink from '@mui/material/Link';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { NavLink } from '@/components/elements/nav-link/nav-link';
import { AUTH_LINKS } from '@/constants/links';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { clearUser } from '@/store/slicers/userSlicer';
import type { AppUser } from '@/types/userData';
import { userLogout } from '@/utils/firebase/auth';
import { isTokenValid } from '@/utils/firebase/tokenValidation';

interface AuthPanelProps {
  user?: AppUser | null;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

export default function AuthPanel({
  isSidebarOpen,
  closeSidebar,
}: AuthPanelProps) {
  const t = useTranslations('home_general');
  const pathname = usePathname();
  const tToast = useTranslations('toast');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    user: currentUser,
    isValid,
    loading,
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (
      !loading &&
      currentUser?.expiresIn &&
      !isTokenValid(currentUser.expiresIn)
    ) {
      void userLogout(tToast);
      dispatch(clearUser());
      router.push('/');
    }
  }, [currentUser, loading, dispatch, tToast, router]);

  const handleSignOut = async () => {
    await userLogout(tToast);
    closeSidebar();
    dispatch(clearUser());
    router.push('/');
  };

  if (loading) {
    return null;
  }

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
      {isValid ? (
        <>
          <MuiLink
            href="/"
            color="inherit"
            component={Link}
            underline={pathname === '/' ? 'always' : 'hover'}
          >
            <Typography fontWeight="normal" variant="h6" sx={{ flexGrow: 1 }}>
              {t('buttons.main')}
            </Typography>
          </MuiLink>
          <Button onClick={() => void handleSignOut()} sx={{ px: 2 }}>
            <Typography color="var(--foreground)">
              {t('buttons.sign-out')}
            </Typography>
          </Button>
        </>
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
