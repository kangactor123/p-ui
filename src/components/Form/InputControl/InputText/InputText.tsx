import React, { ReactElement, useContext } from 'react';
import { TextFieldProps, IconButton } from '@mui/material';
import { TextField, getInputStyleBySize, iconClearBtn } from '../TextField.style';
import { PlayceThemeContext, ThemeProvider } from '../../../../providers';
import { Size } from '../../../../common/enum';
import { ClearIcon } from '../../../icons';
import { css } from '@emotion/react';

export const inputWrap = css`
  width: 100%;
  position: relative;
`;

export type TInputTextProps = TextFieldProps & {
  inputSize?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  useClearBtn?: boolean;
  handleClear: () => void;
};

/**
 * @param inputSize: default 는 'medium', 'large', 'small
 */
function InputText({
  inputProps = {},
  variant = 'outlined',
  inputSize = Size.L,
  useClearBtn = false,
  onBlur,
  handleClear,
  ...props
}: TInputTextProps): ReactElement {
  const { sx: inputSx, ...input } = inputProps;
  const inputStyle = getInputStyleBySize(inputSize);
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <div css={inputWrap}>
        <TextField
          variant={variant}
          InputProps={{
            endAdornment: useClearBtn ? (
              <IconButton onClick={handleClear} disableRipple css={iconClearBtn}>
                <ClearIcon />
              </IconButton>
            ) : undefined,
            inputProps: {
              maxLength: 255,
              sx: inputStyle,
              ...input,
            },
          }}
          {...props}
        />
      </div>
    </ThemeProvider>
  );
}

export default InputText;
