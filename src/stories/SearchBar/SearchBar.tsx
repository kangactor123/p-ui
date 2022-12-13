import React, { ReactElement, useContext } from 'react';
import { IconButton, TextFieldProps, TextField, Theme, InputAdornment, ThemeProvider } from '@mui/material';
import { cx } from '@emotion/css';
import { ClearIcon, SearchIcon } from '../icons';
import { Size } from '../../common/enum';
import { PlayceThemeContext } from '../../providers';
import { getInputStyleBySize, iconButtonCss, textFieldStyle } from '../Form/InputControl/TextField.style';

export type TSearchInputProps = TextFieldProps & {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteSearchKeyword: () => void;
  inputSize?: 'large' | 'medium' | 'small';
};

function SearchBar(props: TSearchInputProps): ReactElement {
  const {
    placeholder,
    value,
    inputSize = Size.M,
    onChange,
    onDeleteSearchKeyword,
    InputProps = {},
    ...defaultProps
  } = props;
  const theme = useContext(PlayceThemeContext);
  const inputStyle = getInputStyleBySize(inputSize);

  return (
    <ThemeProvider theme={theme as Theme}>
      <TextField
        css={textFieldStyle}
        value={value}
        onChange={onChange}
        className={cx('search-input')}
        inputProps={{
          sx: inputStyle,
        }}
        InputProps={{
          ...InputProps,
          sx: { paddingRight: '12px', ...InputProps.sx },
          placeholder,
          endAdornment: (
            <InputAdornment position="start" sx={{ marginRight: 0 }}>
              {value ? (
                <IconButton css={iconButtonCss} onClick={onDeleteSearchKeyword}>
                  <ClearIcon />
                </IconButton>
              ) : (
                <SearchIcon />
              )}
            </InputAdornment>
          ),
        }}
        {...defaultProps}
      />
    </ThemeProvider>
  );
}

export default SearchBar;
