import React, { ReactElement, useContext, useState } from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps, Theme, ThemeProvider } from '@mui/material';
import { useController, FieldValues } from 'react-hook-form';
import { css } from '@emotion/react';
import { getInputStyleBySize, iconButtonCss } from '../TextField.style';
import { TControl } from '../../../../common/type';
import { Size } from '../../../../common/enum';
import { PlayceThemeContext } from '../../../../providers';
import { ClearIcon, InvisibleIcon, VisibleIcon } from '../../../icons';
import { cx } from '@emotion/css';

export type TInputPasswordProps<T extends FieldValues> = TextFieldProps &
  TControl<T> & {
    useClearBtn?: boolean;
    inputSize?: 'large' | 'medium' | 'small';
    isError?: boolean;
  };

const endAdornmentCss = css`
  padding-right: 14px;
`;

/**
 * @param inputSize: default 는 'medium', 'large', 'small
 * @returns control 로 다룰수 있는 Password Field
 */
function InputPassword<T extends FieldValues>({
  InputProps = {},
  variant = 'outlined',
  useClearBtn = true,
  control,
  name,
  rules,
  isError,
  inputSize = Size.M,
  ...props
}: TInputPasswordProps<T>): ReactElement {
  const inputStyle = getInputStyleBySize(inputSize);
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
    <ThemeProvider theme={theme as Theme}>
      <TextField
        value={value}
        variant={variant}
        onChange={onChange}
        type={isVisible ? 'text' : 'password'}
        className={cx('outlined-input', isError && 'outlined-input-error')}
        inputProps={{
          ...props.inputProps,
          sx: { ...inputStyle, ...props?.inputProps?.sx },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" css={endAdornmentCss}>
              {value && useClearBtn && (
                <IconButton onClick={() => onChange('')} disableRipple css={iconButtonCss}>
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
        {...props}
      />
    </ThemeProvider>
  );
}

export default InputPassword;
