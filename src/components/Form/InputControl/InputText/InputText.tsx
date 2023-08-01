import React, { ReactElement } from 'react';
import { TextFieldProps, IconButton, TextField, InputAdornment } from '@mui/material';
import { ThemeProvider } from '../../../../providers';
import { Size } from '../../../../common/enum';
import { ClearIcon } from '../../../icons';
import { t } from 'i18next';

export type TInputTextProps = TextFieldProps & {
  useClearBtn?: boolean;
};

function InputText({
  value = '',
  placeholder = 'this is placeholder',
  size = Size.S,
  useClearBtn = false,
  ...props
}: TInputTextProps): ReactElement {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // if (onChange instanceof Function) {
    //   onChange('');
    // }
  };

  return (
    <ThemeProvider>
      <TextField
        size={size}
        value={value}
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
