'use client';

import { Box } from '@mui/material';
import { useCallback, useState } from 'react';

import Body from './body';
import GenerateCode from './generate-code';

export default function Code() {
  const [generatedCode, setGeneratedCode] = useState<string>('');

  const handleGenerateCode = useCallback(() => {
    // TODO
    setGeneratedCode('');
  }, []);

  const handleCopyCode = useCallback(() => {
    // TODO
    setGeneratedCode('');
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <GenerateCode
        generatedCode={generatedCode}
        handleGenerateCode={handleGenerateCode}
        handleCopyCode={handleCopyCode}
      />
      <Body generatedCode={generatedCode} />
    </Box>
  );
}
