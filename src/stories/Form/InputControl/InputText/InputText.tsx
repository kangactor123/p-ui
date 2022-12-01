import React, { ChangeEvent, ReactElement, useCallback, useContext } from 'react';
import { TextFieldProps, TextField, ThemeProvider, ThemeOptions, Theme } from '@mui/material';
import { FieldValues, useController } from 'react-hook-form';
import { TControl } from '../../../../common/type';
import { PlayceThemeContext } from '../../../../providers';
import { Size } from '../../../../common/enum';
import { css } from '@emotion/react';
import { SxProps } from '@mui/system';

export type TInputTextProps<T extends FieldValues> = TextFieldProps &
  TControl<T> & { inputSize?: 'large' | 'medium' | 'small'; isError?: boolean };

export const textFieldStyle = css`
  & input {
    height: 22px;
    font-size: 14px;
    color: #323338;
  }

  & input::placeholder {
    color: #676879;
  }
`;

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
  inputSize = Size.Medium,
  isError,
  ...props
}: TInputTextProps<T>): ReactElement {
  const { sx: inputSx, ...input } = inputProps;
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

  const inputStyle: SxProps<Theme> = {
    padding: inputSize === Size.Large ? '13px 15px' : inputSize === Size.Medium ? '9px 15px' : '5px 15px',
    ...inputSx,
  };

  return (
    <ThemeProvider theme={theme as ThemeOptions}>
      <TextField
        value={value}
        variant={variant}
        onChange={handleChange}
        inputProps={{ maxLength: 255, sx: inputStyle, ...input }}
        css={css`
          ${textFieldStyle}
          & fieldset {
            border-color: ${isError ? '#D83A52' : '#C5C7D0'};
          }
        `}
        {...props}
      />
    </ThemeProvider>
  );
}

export default InputText;
