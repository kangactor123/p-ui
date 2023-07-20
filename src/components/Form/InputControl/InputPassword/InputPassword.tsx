import React, { ReactElement, useCallback, useContext, useState } from 'react';
import { IconButton, InputAdornment, TextFieldProps, Theme, ThemeProvider } from '@mui/material';
import { css } from '@emotion/react';
import { getInputStyleBySize, iconButtonCss } from '../TextField.style';
import { Size } from '../../../../common/enum';
import { PlayceThemeContext } from '../../../../providers';
import { ClearIcon, InvisibleIcon, VisibleIcon } from '../../../icons';
import { TextField } from './InputPassword.style';

export type TInputPasswordProps = TextFieldProps & {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  useClearBtn?: boolean;
  inputSize?: 'large' | 'medium' | 'small';
  forwardedRef?: React.Ref<HTMLInputElement>;
  onChange?: () => void;
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

  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.currentTarget.value);

      if (onChange instanceof Function) {
        onChange();
      }
    },
    [onChange, setPassword],
  );

  const handleDeletePassword = useCallback(() => {
    setPassword('');

    if (onDelete instanceof Function) {
      onDelete();
    }
  }, [onDelete, setPassword]);

  return (
    <ThemeProvider theme={theme as Theme}>
      <TextField
        variant={variant}
        type={isVisible ? 'text' : 'password'}
        onChange={handleChangePassword}
        inputProps={{ sx: inputStyle }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" css={endAdornmentStyle}>
              {useClearBtn && (
                <IconButton onClick={handleDeletePassword} disableRipple css={iconButtonCss}>
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
