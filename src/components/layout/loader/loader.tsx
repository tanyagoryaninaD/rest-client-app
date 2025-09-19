import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <Stack
      sx={{
        flexGrow: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color="inherit" />
    </Stack>
  );
}
