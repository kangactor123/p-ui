import React, { ReactElement } from 'react';
import { IconButton, TextFieldProps, InputAdornment, TextField } from '@mui/material';
import { ClearIcon, SearchIcon } from '../icons';
import { Size } from '../../common/enum';
import { ThemeProvider } from '../../providers';
import { t } from 'i18next';
import { cx } from '@emotion/css';

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
    placeholder = 'Search',
    size = Size.S,
    ...defaultProps
  } = props;

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
        InputProps={{
          ...InputProps,
          className: cx('playce-search', InputProps?.className),
          placeholder,
          endAdornment: (
            <InputAdornment position="end">
              {value ? (
                <IconButton onClick={handleDelete}>
                  <ClearIcon />
                </IconButton>
              ) : (
                <IconButton>
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
