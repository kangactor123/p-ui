import { StyledComponent } from '@emotion/styled';
import { styled as MUIStyled, TextField as MUITextField, TextFieldProps, Theme } from '@mui/material';
import { MUIStyledCommonProps } from '@mui/system';

export const TextField: StyledComponent<TextFieldProps & MUIStyledCommonProps<Theme>, {}, {}> = MUIStyled(MUITextField)(
  {
    minWidth: 'unset',

    '& .MuiInputBase-multiline': {
      padding: 0,

      '& .MuiOutlinedInput-input': {
        height: '90px !important',
      },
    },
  },
);
