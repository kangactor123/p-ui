import React, { ReactElement, useContext, useState } from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Theme,
  ThemeProvider,
} from '@mui/material';
import { SxProps } from '@mui/system';
import { useController, FieldValues } from 'react-hook-form';
import { TControl } from '../../../../common/type';
import { ClearIcon, InvisibleIcon, VisibleIcon } from '../../../icons';
import { PlayceThemeContext } from '../../../../providers';
import { Size } from '../../../../common/enum';
import { css } from '@emotion/react';
import { textFieldStyle } from '../InputText';

export type TInputPasswordProps<T extends FieldValues> = TextFieldProps &
  TControl<T> & {
    useClearBtn?: boolean;
    inputSize?: 'large' | 'medium' | 'small';
    isError?: boolean;
  };

const passwordFieldStyle = css`
  ${textFieldStyle}
  & input {
    padding: 0;
  }
  & .MuiInputBase-root {
    padding-right: 0px;
  }
`;

const endAdornmentcss = css`
  padding-right: 12px;
`;

const iconButtonCss = css`
  width: 20px;
  height: 20px;
  padding: 0;

  &.MuiButtonBase-root.MuiIconButton-root {
    width: 20px;
    height: 20px;
    padding: 0;
  }
`;

/**
 * @param inputSize: default 는 'medium', 'large', 'small
 * @returns control 로 다룰수 있는 Password Field
 */
function InputPassword<T extends FieldValues>({
  inputProps = {},
  variant = 'outlined',
  useClearBtn = true,
  control,
  name,
  rules,
  isError,
  inputSize = Size.Medium,
  ...props
}: TInputPasswordProps<T>): ReactElement {
  const { sx: inputSx } = inputProps;
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

  const inputStyle: SxProps<Theme> = {
    padding: inputSize === Size.Large ? '13px 15px' : inputSize === Size.Medium ? '9px 15px' : '5px 15px',
    ...inputSx,
  };

  const textfieldCss = css`
    ${passwordFieldStyle}
    & fieldset {
      border-color: ${isError ? '#D83A52' : '#C5C7D0'};
    }
  `;

  return (
    <ThemeProvider theme={theme as Theme}>
      <TextField
        css={textfieldCss}
        value={value}
        variant={variant}
        onChange={onChange}
        type={isVisible ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" css={endAdornmentcss}>
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
          sx: inputStyle,
        }}
        {...props}
      />
    </ThemeProvider>
  );
}

export default InputPassword;
