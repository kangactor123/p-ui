import React, { ReactElement, useContext, useState } from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps, ThemeOptions, ThemeProvider } from '@mui/material';
import { useController, FieldValues } from 'react-hook-form';
import { TControl } from '../../../../common/type';
import { IconPasswordHide, IconPasswordShow, IconUploadClose } from '../../../icons';
import { PlayceThemeContext } from '../../../../providers';

export type TInputPasswordProps<T extends FieldValues> = TextFieldProps &
  TControl<T> & {
    useClearBtn?: boolean;
  };

function InputPassword<T extends FieldValues>({
  variant = 'outlined',
  useClearBtn = true,
  control,
  name,
  rules,
  ...props
}: TInputPasswordProps<T>): ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useContext(PlayceThemeContext);
  const visibleChange = () => setIsVisible((prev) => !prev);
  const {
    field: { value, onChange },
  } = useController({
    name,
    rules,
    control,
  });

  return (
    <ThemeProvider theme={theme as ThemeOptions}>
      <TextField
        {...props}
        variant={variant}
        value={value}
        onChange={onChange}
        type={isVisible ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {value && useClearBtn && (
                <IconButton onClick={() => onChange('')}>
                  <IconUploadClose />
                </IconButton>
              )}
              <IconButton onClick={visibleChange}>{isVisible ? <IconPasswordShow /> : <IconPasswordHide />}</IconButton>
            </InputAdornment>
          ),
        }}
      />
    </ThemeProvider>
  );
}

export default InputPassword;
