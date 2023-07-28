import React, { ReactElement } from 'react';
import { TextFieldProps, IconButton, TextField, InputAdornment } from '@mui/material';
import { getInputStyleBySize, iconClearBtn } from '../TextField.style';
import { ThemeProvider } from '../../../../providers';
import { Size } from '../../../../common/enum';
import { ClearIcon } from '../../../icons';
import { css } from '@emotion/react';
import { t } from 'i18next';
import { TSize } from '../../../../common/type';

export type TInputTextProps = TextFieldProps & {
  size: TSize;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  useClearBtn?: boolean;
  handleClear: () => void;
};

const textFieldStyle = css`
  & .MuiOutlinedInput-root {
    padding-right: unset;
  }
  input {
    padding: unset;
  }
`;

function InputText({
  value = '',
  inputProps = {},
  variant = 'outlined',
  size = Size.S,
  useClearBtn = false,
  onChange,
  onBlur,
  onKeyDown,
  handleClear,
  ...props
}: TInputTextProps): ReactElement {
  const { sx: inputSx, ...input } = inputProps;
  const inputStyle = getInputStyleBySize(size);
  const placeholder = t(props.placeholder || 'this is placeholder');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange instanceof Function) {
      onChange(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (onBlur instanceof Function) {
      onBlur(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown instanceof Function) {
      onKeyDown(event);
    }
  };

  return (
    <ThemeProvider>
      <TextField
        size={size}
        value={value}
        css={textFieldStyle}
        variant={variant}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        inputProps={{
          maxLength: 255,
          ...input,
          // sx: inputStyle,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {useClearBtn && value && (
                <IconButton onClick={handleClear} disableRipple css={iconClearBtn}>
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </ThemeProvider>
  );
}

export default InputText;
