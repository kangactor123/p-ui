import React, { ReactElement } from 'react';
import { TextFieldProps, IconButton, TextField, InputAdornment } from '@mui/material';
import { ThemeProvider } from '../../../../providers';
import { Size } from '../../../../common/enum';
import { ClearIcon } from '../../../icons';
import { t } from 'i18next';

export type TInputTextProps = Omit<TextFieldProps, 'onChange'> & {
  onChange: (value: string) => void;
  useClearBtn?: boolean;
};

function InputText({
  value = '',
  onChange,
  placeholder = 'this is placeholder',
  size = Size.S,
  useClearBtn = false,
  ...props
}: TInputTextProps): ReactElement {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange instanceof Function) {
      onChange(event.target.value);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onChange instanceof Function) {
      onChange('');
    }
  };

  return (
    <ThemeProvider>
      <TextField
        size={size}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {useClearBtn && !!value && (
                <IconButton onClick={handleDelete} disableRipple>
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </ThemeProvider>
  );
}

export default InputText;
