import React, { ChangeEvent, ReactElement, useCallback, useContext } from 'react';
import { TextFieldProps, TextField, ThemeProvider, ThemeOptions, Theme } from '@mui/material';
import { FieldValues, useController } from 'react-hook-form';
import { TControl } from '../../../../common/type';
import { PlayceThemeContext } from '../../../../providers';
import { Size } from '../../../../common/enum';
import { css } from '@emotion/react';
import { SxProps } from '@mui/system';

export type TInputTextProps<T extends FieldValues> = Omit<TextFieldProps, 'size'> &
  TControl<T> & { size?: Size | string; isError?: boolean };

export const textFieldStyle = css`
  & input {
    /* padding: 0; */
    font-size: 14px;
    color: #323338;
  }

  & input::placeholder {
    color: #676879;
  }
`;

/**
 * @returns control 로 다룰수 있는 InputText
 */
function InputText<T extends FieldValues>({
  inputProps = {},
  variant = 'outlined',
  sx,
  name,
  rules,
  control,
  onChange,
  size = Size.Medium,
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
    padding: size === Size.Large ? '15px 12px' : size === Size.Medium ? '8px 17px 10px 15px' : '5px 8px',
    ...inputSx,
  };

  return (
    <ThemeProvider theme={theme as ThemeOptions}>
      <TextField
        value={value}
        variant={variant}
        onChange={handleChange}
        inputProps={{ maxLength: 255, sx: inputStyle, ...input }}
        sx={{ width: 300, ...sx }}
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
