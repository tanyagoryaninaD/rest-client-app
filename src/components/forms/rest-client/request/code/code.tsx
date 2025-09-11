'use client';

import { Stack } from '@mui/material';
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
    <Stack spacing={2}>
      <GenerateCode
        generatedCode={generatedCode}
        handleGenerateCode={handleGenerateCode}
        handleCopyCode={handleCopyCode}
      />
      <Body generatedCode={generatedCode} />
    </Stack>
  );
}
