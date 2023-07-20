import React, { ReactElement, useContext } from 'react';
import { TextFieldProps, ThemeProvider, Theme, IconButton } from '@mui/material';
import { getInputStyleBySize, iconClearBtn } from '../TextField.style';
import { PlayceThemeContext } from '../../../../providers';
import { Size } from '../../../../common/enum';
import { TextField, inputWrap } from './InputText.style';
import { ClearIcon } from '../../../icons';

export type TInputTextProps = TextFieldProps & {
  inputSize?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  useClearBtn?: boolean;
};

/**
 * @param inputSize: default 는 'medium', 'large', 'small
 */
function InputText({
  inputProps = {},
  variant = 'outlined',
  inputSize = Size.L,
  useClearBtn = false,
  ...props
}: TInputTextProps): ReactElement {
  const { sx: inputSx, ...input } = inputProps;
  const inputStyle = getInputStyleBySize(inputSize);
  const theme = useContext(PlayceThemeContext);

  const handleClearValue = () => {
    const event = { target: { value: '' } } as React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >;
    if (props.onChange instanceof Function) {
      props.onChange(event);
    }
  };

  return (
    <ThemeProvider theme={theme as Theme}>
      <div css={inputWrap}>
        <TextField
          variant={variant}
          InputProps={{
            endAdornment: useClearBtn ? (
              <IconButton onClick={handleClearValue} disableRipple css={iconClearBtn}>
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
