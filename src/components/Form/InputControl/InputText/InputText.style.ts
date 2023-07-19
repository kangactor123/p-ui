import { StyledComponent } from '@emotion/styled';
import {
  styled as MUIStyled,
  TextField as MUITextField,
  TextFieldProps,
  Theme,
} from '@mui/material';
import { MUIStyledCommonProps } from '@mui/system';

export const TextField: StyledComponent<TextFieldProps & MUIStyledCommonProps<Theme>, {}, {}> =
  MUIStyled(MUITextField)({
    borderRadius: '4px',
    color: '#808591',
    backgroundColor: 'transparent',
    border: 'unset',
    maxWidth: '640px',
    minWidth: '300px',
    '& .MuiInputBase-multiline': {
      padding: 0,
      '& .MuiOutlinedInput-input': {
        height: '90px !important',
      },
    },
    '& .MuiOutlinedInput-root': {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    '& .Mui-disabled': {
      backgroundColor: '#E8EAED',
      color: '#B5B8BF',
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: '#D6D9DE !important',
    },
  });
