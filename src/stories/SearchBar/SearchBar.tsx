import React, { ReactElement, useContext } from 'react';
import { IconButton, TextFieldProps, TextField, SxProps, Theme, InputAdornment, ThemeProvider } from '@mui/material';
import { cx } from '@emotion/css';
import { ClearIcon, SearchIcon } from '../icons';
import { Size } from '../../common/enum';
import { PlayceThemeContext } from '../../providers';
import { iconButtonCss, textFieldStyle } from '../Form/InputControl/TextField.style';

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

  const inputStyle: SxProps<Theme> = {
    padding: inputSize === Size.L ? '13px 15px' : inputSize === Size.M ? '9px 15px' : '5px 15px',
  };

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
