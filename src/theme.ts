'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  cssVariables: true,
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          'input:-webkit-autofill': {
            WebkitBoxShadow: 'unset',
            WebkitTextFillColor: 'unset',
            caretColor: 'unset',
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderSpacing: '2px',
          borderCollapse: 'separate',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderRight: '1px solid var(--mui-palette-TableCell-border)',
          fontFamily: 'monospace',
          fontSize: '1.2rem',
        },
      },
    },
  },
});
