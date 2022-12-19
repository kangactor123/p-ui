import React, { ChangeEvent, ReactElement, useCallback, useContext } from 'react';
import { TextFieldProps, TextField, ThemeProvider, Theme } from '@mui/material';
import { FieldValues, useController } from 'react-hook-form';
import { getInputStyleBySize, textFieldStyle } from '../TextField.style';
import { TControl } from '../../../../common/type';
import { PlayceThemeContext } from '../../../../providers';
import { Size } from '../../../../common/enum';
import { cx } from '@emotion/css';

export type TInputTextProps<T extends FieldValues> = TextFieldProps &
  TControl<T> & { inputSize?: 'large' | 'medium' | 'small'; isError?: boolean };

/**
 * @param inputSize: default 는 'medium', 'large', 'small
 * @returns control 로 다룰수 있는 InputText
 */
function InputText<T extends FieldValues>({
  inputProps = {},
  variant = 'outlined',
  name,
  rules,
  control,
  onChange,
  inputSize = Size.M,
  isError,
  ...props
}: TInputTextProps<T>): ReactElement {
  const { sx: inputSx, ...input } = inputProps;
  const inputStyle = getInputStyleBySize(inputSize);
  const theme = useContext(PlayceThemeContext);
  const {
    field: { value, onChange: controlChange },
  } = useController({
    name,
    rules,
    control,
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      controlChange(event);
      if (onChange instanceof Function) {
        onChange(event);
      }
    },
    [controlChange, onChange],
  );

  return (
    <ThemeProvider theme={theme as Theme}>
      <TextField
        value={value}
        variant={variant}
        onChange={handleChange}
        inputProps={{ maxLength: 255, sx: inputStyle, ...input, ...(isError && { className: 'error' }) }}
        className={cx('textField')}
        {...props}
      />
    </ThemeProvider>
  );
}

export default InputText;
