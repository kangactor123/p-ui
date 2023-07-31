import React, { ReactElement } from 'react';
import { IconButton, TextFieldProps, InputAdornment, TextField } from '@mui/material';
import { ClearIcon, SearchIcon } from '../icons';
import { Size } from '../../common/enum';
import { ThemeProvider } from '../../providers';
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
        InputProps={{
          ...InputProps,
          sx: {
            paddingRight: '12px',
            width: '200px',
            backgroundColor: emotionTheme.palette.greyScale.grey5,
            ...InputProps.sx,
          },
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
