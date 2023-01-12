import {
  styled as MUIStyled,
  FormControlLabel as MUIFormControlLabel,
  Theme,
  FormControlLabelProps,
} from '@mui/material';
import { StyledComponent } from '@emotion/styled';
import { MUIStyledCommonProps } from '@mui/system';

export const FormControlLabel: StyledComponent<FormControlLabelProps & MUIStyledCommonProps<Theme>> = MUIStyled(
  MUIFormControlLabel,
)({
  '& .MuiFormControlLabel-label': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 'calc(100% - 23px)',
    textOverflow: 'ellipsis',
  },
});
