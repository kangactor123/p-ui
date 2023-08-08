import React, { ReactElement, useState } from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Size } from '../../../../common/enum';
import { ThemeProvider } from '../../../../providers';
import { InvisibleIcon, VisibleIcon } from '../../../icons';

export type TInputPasswordProps = Omit<TextFieldProps, 'onChange'> & {
  forwardedRef?: React.Ref<HTMLInputElement>;
  onChange: (value: string) => void;
};

function InputPassword({
  size = Size.M,
  onChange,
  forwardedRef,
  ...props
}: TInputPasswordProps): ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const visibleChange = () => setShowPassword((prev) => !prev);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange instanceof Function) {
      onChange(event.target.value);
    }
  };

  return (
    <ThemeProvider>
      <TextField
        size={size}
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        inputRef={forwardedRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={visibleChange} disableRipple>
                {showPassword ? <VisibleIcon /> : <InvisibleIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </ThemeProvider>
  );
}

export default InputPassword;
