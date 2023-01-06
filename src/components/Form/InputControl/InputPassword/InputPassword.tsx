import React, { ReactElement, useContext, useState } from 'react';
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material';
import { css } from '@emotion/react';
import { TextField, getInputStyleBySize, iconButtonCss } from '../TextField.style';
import { Size } from '../../../../common/enum';
import { PlayceThemeContext, ThemeProvider } from '../../../../providers';
import { ClearIcon, InvisibleIcon, VisibleIcon } from '../../../icons';

export type TInputPasswordProps = TextFieldProps & {
  value: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  useClearBtn?: boolean;
  inputSize?: 'large' | 'medium' | 'small';
  forwardedRef?: React.Ref<HTMLInputElement>;
  onChange?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
};

const endAdornmentStyle = css`
  padding-right: 12px;
`;

/**
 * @param inputSize: default 는 'medium', 'large', 'small
 * @returns control 로 다룰수 있는 Password Field
 */
function InputPassword({
  value,
  InputProps = {},
  variant = 'outlined',
  useClearBtn = true,
  inputSize = Size.M,
  setPassword,
  onChange,
  onDelete,
  ...props
}: TInputPasswordProps): ReactElement {
  const { forwardedRef } = props;
  const inputStyle = getInputStyleBySize(inputSize);
  const [isVisible, setIsVisible] = useState(false);
  const theme = useContext(PlayceThemeContext);

  const visibleChange = () => setIsVisible((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant={variant}
        value={value}
        type={isVisible ? 'text' : 'password'}
        onChange={onChange}
        inputProps={{ sx: inputStyle }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" css={endAdornmentStyle}>
              {value && useClearBtn && (
                <IconButton onClick={onDelete} disableRipple css={iconButtonCss}>
                  <ClearIcon />
                </IconButton>
              )}
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
