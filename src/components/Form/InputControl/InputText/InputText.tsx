import React, { ChangeEvent, ReactElement, useCallback, useContext } from 'react';
import { TextFieldProps, ThemeProvider, Theme } from '@mui/material';
import { getInputStyleBySize } from '../TextField.style';
import { TControl } from '../../../../common/type';
import { PlayceThemeContext } from '../../../../providers';
import { Size } from '../../../../common/enum';
import { cx } from '@emotion/css';
import { TextField } from './InputText.style';

export type TInputTextProps = TextFieldProps & {
  inputSize?: 'large' | 'medium' | 'small';
  isError?: boolean;
};

/**
 * @param inputSize: default 는 'medium', 'large', 'small
 */
function InputText({
  inputProps = {},
  variant = 'outlined',
  inputSize = Size.L,
  ...props
}: TInputTextProps): ReactElement {
  const { sx: inputSx, ...input } = inputProps;
  const inputStyle = getInputStyleBySize(inputSize);
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme as Theme}>
      <TextField
        variant={variant}
        inputProps={{ maxLength: 255, sx: inputStyle, ...input }}
        {...props}
      />
    </ThemeProvider>
  );
}

export default InputText;
