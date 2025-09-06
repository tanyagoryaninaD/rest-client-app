'use client';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';

import LocaleSwitcher from '@/components/localeSwitcher/LocaleSwitcher';
import { Link, usePathname } from '@/i18n/navigation';

import Sidebar from '../sidebar/sidebar';
import AuthPanel from './auth-panel/auth-panel';
import HeaderIconButton from './header-icon-button/header-icon-button';

export default function Header() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  // TODO: Add user context
  const user = undefined;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scrollHandler = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
          headerRef.current?.classList.add('sticky');
        } else {
          headerRef.current?.classList.remove('sticky');
        }
      }, 100);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      clearTimeout(timeoutId);
    };
  }, []);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppBar ref={headerRef} color="inherit" position="static">
      <Toolbar
        sx={{
          maxWidth: 'xl',
          justifyContent: 'space-between',
          alignSelf: 'center',
          width: '100%',
        }}
      >
        <MuiLink
          href="/"
          color="inherit"
          component={Link}
          underline={pathname === '/' ? 'always' : 'hover'}
        >
          <Typography fontWeight="normal" variant="h6" sx={{ flexGrow: 1 }}>
            TDA REST Client
          </Typography>
        </MuiLink>
        <Stack direction="row" spacing={2}>
          {!isSidebarOpen && (
            <AuthPanel
              isSidebarOpen={isSidebarOpen}
              user={user}
              closeSidebar={closeSidebar}
            />
          )}
          <LocaleSwitcher />
          <HeaderIconButton
            handleClick={() => {
              setIsSidebarOpen(true);
            }}
            sxStyleProps={{
              display: {
                md: 'none',
              },
            }}
          >
            <MenuIcon />
          </HeaderIconButton>
        </Stack>
      </Toolbar>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        user={user}
      />
    </AppBar>
  );
}
