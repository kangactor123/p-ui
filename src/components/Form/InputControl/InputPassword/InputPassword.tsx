import React, { ReactElement, useContext, useState } from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { css } from '@emotion/react';
import { getInputStyleBySize, iconButtonCss } from '../TextField.style';
import { Size } from '../../../../common/enum';
import { PlayceThemeContext, ThemeProvider } from '../../../../providers';
import { ClearIcon, InvisibleIcon, VisibleIcon } from '../../../icons';

export type TInputPasswordProps = TextFieldProps & {
  value: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  inputSize?: 'large' | 'medium' | 'small';
  forwardedRef?: React.Ref<HTMLInputElement>;
  onChange?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const endAdornmentStyle = css`
  padding-right: 12px;
`;

/**
 * @param inputSize: default 는 'medium', 'small', large'
 */

function InputPassword({
  value,
  InputProps = {},
  variant = 'outlined',
  inputSize = Size.M,
  setPassword,
  onChange,
  ...props
}: TInputPasswordProps): ReactElement {
  const { forwardedRef } = props;
  const inputStyle = getInputStyleBySize(inputSize);
  const [isVisible, setIsVisible] = useState(false);
  const theme = useContext(PlayceThemeContext);
  const visibleChange = () => setIsVisible((prev) => !prev);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange instanceof Function) {
      onChange(event);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
