import { InputProps } from '@/types/elements/input';
import type { JSX } from 'react';
import TextField from '@mui/material/TextField';

function Input(props: InputProps): JSX.Element {
  const {
    id,
    name,
    type,
    label,
    placeholder,
    autoFocus,
    errorMessage,
    register,
  } = props;

  const inputId = id || name;

  return (
    <TextField
      {...(register
        ? register(name, type === 'number' ? { valueAsNumber: true } : {})
        : {})}
      id={inputId}
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoComplete="on"
      fullWidth
      margin="normal"
      error={!!errorMessage}
      helperText={errorMessage}
    />
  );
}

export default Input;
