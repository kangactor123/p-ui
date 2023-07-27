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

const endAdornmentStyle = css`
  padding-right: 12px;
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
        variant={variant}
        value={value}
        type={isVisible ? 'text' : 'password'}
        onChange={handleChange}
        inputProps={{ sx: inputStyle }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" css={endAdornmentStyle}>
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
