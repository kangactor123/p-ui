import React, { ReactElement, useState } from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { css } from '@emotion/react';
import { getInputStyleBySize, iconButtonCss } from '../TextField.style';
import { Size } from '../../../../common/enum';
import { ThemeProvider } from '../../../../providers';
import { InvisibleIcon, VisibleIcon } from '../../../icons';

export type TInputPasswordProps = TextFieldProps & {
  value: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  forwardedRef?: React.Ref<HTMLInputElement>;
  onChange?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const textFieldStyle = css`
  & .MuiOutlinedInput-root {
    padding-right: 12px;
  }
  input {
    padding: unset;
  }
`;

function InputPassword({
  value,
  InputProps = {},
  variant = 'outlined',
  size = Size.M,
  setPassword,
  onChange,
  ...props
}: TInputPasswordProps): ReactElement {
  const { forwardedRef } = props;
  const inputStyle = getInputStyleBySize(size);
  const [isVisible, setIsVisible] = useState(false);
  const visibleChange = () => setIsVisible((prev) => !prev);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange instanceof Function) {
      onChange(event);
    }
  };

  return (
    <ThemeProvider>
      <TextField
        size={size}
        variant={variant}
        value={value}
        type={isVisible ? 'text' : 'password'}
        onChange={handleChange}
        css={textFieldStyle}
        // inputProps={{ sx: inputStyle }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={visibleChange} disableRipple css={iconButtonCss}>
                {isVisible ? <VisibleIcon /> : <InvisibleIcon />}
              </IconButton>
            </InputAdornment>
          ),
          ...InputProps,
        }}
        inputRef={forwardedRef}
        {...props}
      />
    </ThemeProvider>
  );
}

export default InputPassword;
