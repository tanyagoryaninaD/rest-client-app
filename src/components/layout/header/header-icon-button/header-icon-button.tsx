import Button from '@mui/material/Button';

interface SxObjectProps {
  [key: string]: string | SxObjectProps;
}

interface HeaderIconButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
  sxStyleProps?: SxObjectProps;
  testId?: string;
}

export default function HeaderIconButton({
  children,
  handleClick,
  sxStyleProps,
  testId,
}: HeaderIconButtonProps) {
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
        minWidth: '40px',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        ...sxStyleProps,
      }}
    >
      {children}
    </Button>
  );
}
