'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import Loader from '@/components/layout/loader/loader';
import { useAppSelector } from '@/hooks/redux';
import { Link } from '@/i18n/navigation';
import type { HistoryCollection } from '@/types/userData';
import { getHistory } from '@/utils/firebase/collections';

export default function History() {
  const { user } = useAppSelector((state) => state.user);
  const [requests, setRequests] = useState<HistoryCollection[] | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadHistory = async () => {
      setIsLoadingData(true);
      try {
        const data = await getHistory(user.userId);
        setRequests(data);
      } catch {
        setRequests([]);
      } finally {
        setIsLoadingData(false);
      }
    };

    void loadHistory();
  }, [user]);

  if (isLoadingData || requests === null) return <Loader />;

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        textAlign: 'center',
        py: 4,
        gap: 2,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        History
      </Typography>

      {!requests.length ? (
        <>
          <Typography>You have not executed any requests</Typography>
          <Typography>It is empty here. Try:</Typography>
          <Button
            sx={{ mt: 2, px: 3 }}
            href="/client"
            LinkComponent={Link}
            variant="contained"
          >
            Client
          </Button>
        </>
      ) : (
        <Box>
          {requests.map((item) => (
            <Typography key={item.id}>{JSON.stringify(item)}</Typography>
          ))}
        </Box>
      )}
    </Container>
  );
}
