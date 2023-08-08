import React, { ReactElement } from 'react';
import { IconButton, TextFieldProps, InputAdornment, TextField } from '@mui/material';
import { ClearIcon, SearchIcon } from '../icons';
import { Size } from '../../common/enum';
import { ThemeProvider } from '../../providers';
import { t } from 'i18next';
import { cx } from '@emotion/css';

export type TSearchInputProps = Omit<TextFieldProps, 'onChange'> & {
  onChange: (value: string) => void;
  useClearBtn?: boolean;
};

function SearchBar({
  value,
  onChange,
  InputProps = {},
  placeholder = 'Search',
  size = Size.S,
  ...props
}: TSearchInputProps): ReactElement {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange instanceof Function) {
      onChange(event.target.value);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onChange instanceof Function) {
      onChange('');
    }
  };

  return (
    <ThemeProvider>
      <TextField
        size={size}
        value={value}
        onChange={handleChange}
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
        {...props}
      />
    </ThemeProvider>
  );
}

export default SearchBar;
