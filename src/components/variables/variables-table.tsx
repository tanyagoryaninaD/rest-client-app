import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslations } from 'next-intl';

import { useAppDispatch } from '@/hooks/redux';
import { removeVariable } from '@/store/slicers/variables-slice';

import { VariableRow } from './variable-row';

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  textAlign: 'center',
}));

export default function VariablesTable({
  variables,
}: {
  variables: [string, string][];
}) {
  const t = useTranslations('variables');
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#f7f7f7' }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: 'var(--mui-palette-grey-200)' }}>
          <TableRow>
            <StyledTableCell size="medium" sx={{ width: 0 }}>
              #
            </StyledTableCell>
            <StyledTableCell size="medium">{t('name')}</StyledTableCell>
            <StyledTableCell size="medium">{t('value')}</StyledTableCell>
            <StyledTableCell size="medium" sx={{ width: 0 }}></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variables.length ? (
            variables.map(([name, value], index) => (
              <VariableRow
                key={name}
                index={index}
                name={name}
                value={value}
                onRemove={() => {
                  dispatch(removeVariable(name));
                }}
              />
            ))
          ) : (
            <TableRow>
              <TableCell
                size="medium"
                colSpan={4}
                sx={{ textAlign: 'center', fontSize: '1.2rem' }}
              >
                {t('no_variables')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
