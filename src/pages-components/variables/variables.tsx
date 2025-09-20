import { Container, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import VariableForm from '@/components/forms/variables/variable-form';
import VariablesTable from '@/components/variables/variables-table';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addVariable } from '@/store/slicers/variables-slice';
import { selectAllVariables } from '@/store/slicers/variables-slice';
import type { VariableFormFields } from '@/types/variables';

export default function Variables() {
  const t = useTranslations('variables');
  const dispatch = useAppDispatch();
  const variables = useAppSelector(selectAllVariables);

  const saveVariable = (data: VariableFormFields) => {
    dispatch(addVariable(data));
  };

  return (
    <Container>
      <Stack spacing={4} alignItems="center">
        <Typography variant="h6" component="h1" gutterBottom>
          {t('title')}
        </Typography>
        <VariableForm saveVariable={saveVariable} />
        <VariablesTable variables={Object.entries(variables)} />
      </Stack>
    </Container>
  );
}
