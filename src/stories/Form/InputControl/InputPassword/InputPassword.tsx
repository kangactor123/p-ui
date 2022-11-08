import React, { ReactElement, useContext, useState } from 'react';
import { css } from '@emotion/react';
import { IconButton, InputAdornment, TextField, TextFieldProps, ThemeOptions, ThemeProvider } from '@mui/material';
import { useController, FieldValues } from 'react-hook-form';
import { TControl } from '../../../../common/type';
import { IconPasswordHide, IconPasswordShow, IconUploadClose } from '../../../icons';
import { PlayceThemeContext } from '../../../../providers';

export type TInputPasswordProps<T extends FieldValues> = TextFieldProps &
  TControl<T> & {
    useClearBtn?: boolean;
  };

const iconButton = css`
  padding: 0;
  margin-right: -4px;
`;

const clearPwBtn = css`
  position: absolute;
  right: 30px;
`;

function InputPassword<T extends FieldValues>({
  variant = 'outlined',
  useClearBtn = true,
  control,
  name,
  rules,
  ...props
}: TInputPasswordProps<T>): ReactElement {
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
    <ThemeProvider theme={theme as ThemeOptions}>
      <TextField
        {...props}
        variant={variant}
        value={value}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton css={iconButton} edge="end" aria-label="toggle password visibility" onClick={visibleChange}>
                {isVisible ? <IconPasswordShow /> : <IconPasswordHide />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        type={isVisible ? 'text' : 'password'}
      />
      {value && useClearBtn && (
        <IconButton css={clearPwBtn} onClick={() => onChange('')}>
          <IconUploadClose />
        </IconButton>
      )}
    </ThemeProvider>
  );
}

export default InputPassword;
