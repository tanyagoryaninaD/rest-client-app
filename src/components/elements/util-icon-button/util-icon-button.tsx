import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';

interface SxObjectProps {
  [key: string]: string | SxObjectProps;
}

interface CustomIconButtonProps extends ButtonProps {
  handleClick: () => void;
  sxStyleProps?: SxObjectProps;
  testId?: string;
}

export default function CustomIconButton({
  children,
  handleClick,
  sxStyleProps,
  testId,
  ...rest
}: CustomIconButtonProps) {
  return (
    <Button
      onClick={handleClick}
      size="small"
      aria-label="menu"
      data-testid={testId}
      sx={{
        color: 'var(--background)',
        backgroundColor: 'var(--foreground)',
        boxShadow: 'var(--mui-shadows-2)',
        '&:hover': {
          boxShadow: 'var(--mui-shadows-2), var(--mui-shadows-4)',
        },
        minWidth: '44px',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        ...sxStyleProps,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
