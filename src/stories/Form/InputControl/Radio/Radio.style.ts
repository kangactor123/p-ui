import { css } from '@emotion/react';
import {
  styled as MUIStyled,
  FormControlLabel as MUIFormControlLabel,
  FormControlLabelProps,
  Theme,
} from '@mui/material';
import { StyledComponent } from '@emotion/styled';
import { MUIStyledCommonProps } from '@mui/system';

export const FormControlLabel: StyledComponent<FormControlLabelProps & MUIStyledCommonProps<Theme>, {}, {}> = MUIStyled(
  MUIFormControlLabel,
)({
  marginLeft: '-9px',
  marginRight: '30px',

  '& .MuiFormControlLabel-label': {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
    color: '#323338',
  },

  '& .MuiRadio-root': {
    margin: '0 8px 0 9px',
    padding: 0,

    '&:hover': {
      '& .icon': {
        boxShadow: 'inset 0 0 0 1px #323338, inset 0 -1px 0 #323338',
      },
      '& .checkedIcon': {
        backgroundColor: '#0060B9',
        boxShadow: 'inset 0 0 0 1px #0060B9, inset 0 -1px 0 #0060B9',
      },
    },
  },
});

export const icon = css`
  border-radius: 50%;
  width: 16px;
  height: 16px;
  box-shadow: inset 0 0 0 1px #c3c6d4, inset 0 -1px 0 #c3c6d4;
  background-color: transparent;
  &::before {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    background-image: radial-gradient(#fff, #fff 33%, transparent 33%);
  }

  &:hover {
    box-shadow: inset 0 0 0 1px red, inset 0 -1px 0 red;
    background-image: radial-gradient(red, red 33%, transparent 33%);
  }
`;

export const disabledIcon = css`
  opacity: 0.4;
  background-color: #e6e9ef;
  box-shadow: inset 0 0 0 1px #e6e9ef, inset 0 -1px 0 #e6e9ef;
  &::before {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    background-image: radial-gradient(#e6e9ef, #e6e9ef 3%, transparent 33%);
  }
`;

export const checkedIcon = css`
  background-color: #0073ea;
  box-shadow: inset 0 0 0 1px #0073ea, inset 0 -1px 0 #0073ea;
`;

export const disabledCheckedIcon = css`
  background-color: #e6e9ef;
  box-shadow: inset 0 0 0 1px #e6e9ef, inset 0 -1px 0 #e6e9ef;
  &::before {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    background-image: radial-gradient(rgba(50, 51, 56, 0.38), rgba(50, 51, 56, 0.38) 33%, transparent 33%);
  }
`;

export const radioGroup = css`
  margin-top: 10px;
`;
