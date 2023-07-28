import React, { ReactElement, useContext } from 'react';
import { IconButton, TextFieldProps, InputAdornment, TextField } from '@mui/material';
import { cx } from '@emotion/css';
import { ClearIcon, SearchIcon } from '../icons';
import { Size } from '../../common/enum';
import { PlayceThemeContext, ThemeProvider } from '../../providers';
import { getInputStyleBySize, iconButtonCss } from '../Form/InputControl/TextField.style';
import { iconStyle, searchBarStyle } from './SearchBar.style';
import { useEmotionTheme } from '../../common/theme';
import { t } from 'i18next';

export type TSearchInputProps = TextFieldProps & {
  placeholder?: string;
  value?: string;
  useClearBtn?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onDelete?: () => void;
  isShortWidth?: boolean;
};

function SearchBar(props: TSearchInputProps): ReactElement {
  const {
    value,
    onChange,
    onBlur,
    onKeyDown,
    onDelete,
    InputProps = {},
    size = Size.S,
    ...defaultProps
  } = props;

  const emotionTheme = useEmotionTheme();
  const inputStyle = getInputStyleBySize(size, defaultProps.isShortWidth);
  const placeholder = t(props.placeholder || 'Search');

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

  const handleDelete = () => {
    if (onDelete instanceof Function) {
      onDelete();
    }
  };

  return (
    <ThemeProvider>
      <TextField
        size={size}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        css={searchBarStyle(emotionTheme)}
        inputProps={
          {
            // sx: inputStyle,
          }
        }
        InputProps={{
          ...InputProps,
          sx: { paddingRight: '12px', ...InputProps.sx },
          placeholder,
          endAdornment: (
            <InputAdornment position="start" css={iconStyle}>
              {value ? (
                <IconButton css={iconButtonCss} onClick={handleDelete}>
                  <ClearIcon />
                </IconButton>
              ) : (
                <IconButton css={iconButtonCss}>
                  <SearchIcon />
                </IconButton>
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
