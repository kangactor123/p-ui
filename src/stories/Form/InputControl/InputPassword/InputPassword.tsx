import React, { ReactElement, useContext, useState } from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Theme,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material';
import { SxProps } from '@mui/system';
import { useController, FieldValues } from 'react-hook-form';
import { TControl } from '../../../../common/type';
import { ClearIcon, InvisibleIcon, VisibleIcon } from '../../../icons';
import { PlayceThemeContext } from '../../../../providers';
import { Size } from '../../../../common/enum';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { textFieldStyle } from '../InputText';

export type TInputPasswordProps<T extends FieldValues> = Omit<TextFieldProps, 'size'> &
  TControl<T> & {
    useClearBtn?: boolean;
    size?: Size | string;
    isError?: boolean;
    iconSize?: Size | undefined;
  };

const IconBox = styled(IconButton)`
  padding: 4px;
`;

const passwordFieldStyle = css`
  ${textFieldStyle}
  & input {
    padding: 0;
  }
  & .MuiInputBase-root {
    padding-right: 4px;
  }
`;

function InputPassword<T extends FieldValues>({
  inputProps = {},
  variant = 'outlined',
  useClearBtn = true,
  control,
  name,
  rules,
  isError,
  size = Size.Medium,
  iconSize,
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
    padding: size === Size.Large ? '15px 12px' : size === Size.Medium ? '8px 17px 10px 15px' : '5px 8px',
    ...inputSx,
  };

  return (
    <ThemeProvider theme={theme as ThemeOptions}>
      <TextField
        css={css`
          ${passwordFieldStyle}
          & fieldset {
            border-color: ${isError ? '#D83A52' : '#C5C7D0'};
          }
        `}
        value={value}
        variant={variant}
        onChange={onChange}
        type={isVisible ? 'text' : 'password'}
        sx={{ width: 300, ...props.sx }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {value && useClearBtn && (
                <IconBox onClick={() => onChange('')} disableRipple size={iconSize}>
                  <ClearIcon />
                </IconBox>
              )}
              <IconBox onClick={visibleChange} disableRipple size={iconSize}>
                {isVisible ? <VisibleIcon /> : <InvisibleIcon />}
              </IconBox>
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
