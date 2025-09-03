'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, Link } from '../../i18n/navigation';
import MenuItem from '@mui/material/MenuItem';
import '@/components/localeSwitcher/LocaleSwitcher.css';
import LanguageIcon from '@mui/icons-material/Language';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import { Typography } from '@mui/material';

export default function LocaleSwitcher() {
  const t = useTranslations('languages');
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
        data-testid="local-anchorRef"
      >
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{
            color: 'var(--background)',
            backgroundColor: 'var(--foreground)',
          }}
          data-testid="local-button"
        >
          <LanguageIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  <MenuItem value="en">
                    <Typography
                      component={Link}
                      href={pathname}
                      locale="en"
                      className="local-link"
                      data-testid="local-en"
                    ></Typography>
                    {t('en')}
                  </MenuItem>
                  <MenuItem value="ru">
                    <Typography
                      component={Link}
                      href={pathname}
                      locale="ru"
                      className="local-link"
                      data-testid="local-ru"
                    ></Typography>
                    {t('ru')}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
