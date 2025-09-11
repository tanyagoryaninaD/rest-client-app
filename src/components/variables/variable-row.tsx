import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { styled } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import UtilIconButton from '@/components/elements/util-icon-button/util-icon-button';

interface VariableRowProps {
  index: number;
  name: string;
  value: string;
  onRemove: () => void;
}

const StyledTableCell = styled(TableCell)(() => ({
  maxWidth: '300px',
  overflowX: 'auto',
}));

export function VariableRow({
  index,
  name,
  value,
  onRemove,
}: VariableRowProps) {
  return (
    <TableRow
      sx={{
        '&:nth-of-type(even)': { backgroundColor: '#f3f3f3ff' },
        '&:hover': {
          backgroundColor: 'var(--mui-palette-grey-200)',
          transition: 'background-color 0.1s',
          button: { opacity: 1 },
        },
      }}
    >
      <TableCell sx={{ fontSize: '1rem' }} align="center">
        {index + 1}
      </TableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{value}</StyledTableCell>
      <TableCell>
        <UtilIconButton
          aria-label="remove variable"
          sxStyleProps={{
            color: 'var(--mui-palette-error-dark)',
            boxShadow: 'none',
            backgroundColor: 'transparent',
          }}
          handleClick={onRemove}
        >
          <DeleteOutlinedIcon />
        </UtilIconButton>
      </TableCell>
    </TableRow>
  );
}
