import React, { ReactElement, useState } from 'react';
import { IconButton, TextFieldProps, InputAdornment, TextField } from '@mui/material';
import { ClearIcon, SearchIcon } from '../icons';
import { Size } from '../../common/enum';
import { ThemeProvider } from '../../providers';
import { t } from 'i18next';
import { cx } from '@emotion/css';

export type TSearchInputProps = TextFieldProps & {
  useClearBtn?: boolean;
};

function SearchBar({
  value,
  InputProps = {},
  placeholder = 'Search',
  size = Size.S,
  onChange,
  ...props
}: TSearchInputProps): ReactElement {
  const [innerValue, setInnerValue] = useState<unknown>(value);
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onChange();
  };

  return (
    <ThemeProvider>
      <TextField
        size={size}
        value={value}
        onChange={onChange}
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
