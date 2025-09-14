'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
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
        <Stack
          spacing={2}
          sx={{
            mt: 3,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {requests.map((item) => (
            <CardActionArea
              key={item.id}
              component={Link}
              href={`/client/${item.id}`}
              sx={{ display: 'block', maxWidth: 800 }}
            >
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',

                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 2,
                  },
                }}
              >
                <Typography
                  sx={{
                    alignSelf: 'flex-end',
                    fontSize: '0.75rem',
                  }}
                  variant="body1"
                  color="text.secondary"
                >
                  {new Date(item.requestTimestamp).toLocaleString()}
                </Typography>
                <Typography
                  sx={{ alignSelf: 'flex-start', mb: 1 }}
                  variant="h6"
                >
                  {item.requestMethod}
                </Typography>
                <Typography
                  sx={{ alignSelf: 'flex-start', mb: 1 }}
                  variant="body1"
                >
                  {item.endpointUrl}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    borderTop: 1,
                    borderColor: 'divider',
                  }}
                >
                  {[
                    { label: 'Status', value: item.responseStatusCode },
                    { label: 'Latency', value: `${item.requestDuration}ms` },
                    { label: 'Request Size', value: `${item.requestSize}B` },
                    { label: 'Response Size', value: `${item.responseSize}B` },
                  ].map((field) => (
                    <Box
                      key={field.label}
                      sx={{
                        flex: 1,
                        textAlign: 'center',
                        py: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {field.label}
                      </Typography>
                      <Typography variant="body2">{field.value}</Typography>
                    </Box>
                  ))}
                </Box>

                {item.errorDetails && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ mt: 1, textAlign: 'center' }}
                  >
                    {item.errorDetails}
                  </Typography>
                )}
              </Card>
            </CardActionArea>
          ))}
        </Stack>
      )}
    </Container>
  );
}
