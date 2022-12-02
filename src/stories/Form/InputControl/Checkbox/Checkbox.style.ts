import {
  styled as MUIStyled,
  FormControlLabel as MUIFormControlLabel,
  FormControlLabelProps,
  Theme,
} from '@mui/material';
import { css } from '@emotion/react';
import checkedIcon from '../../../icons/svg/icon-checkbox-checked.svg';
import disabledCheckedIcon from '../../../icons/svg/icon-checkbox-disabled-checked.svg';
import { StyledComponent } from '@emotion/styled';
import { MUIStyledCommonProps } from '@mui/system';

export const FormControlLabel: StyledComponent<FormControlLabelProps & MUIStyledCommonProps<Theme>, {}, {}> = MUIStyled(
  MUIFormControlLabel,
)({
  '& .MuiFormControlLabel-label': {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '22px',
    color: '#323338',
  },

  '& .MuiCheckbox-root': {
    padding: 0,
    maxWidth: '16px',
    maxHeight: '16px',
    marginRight: '7px',
    '&:hover': {
      '& .icon': {
        border: '1px solid #323338',
      },
      '& .checkedIcon': {
        background: '#0060B9',
      },
    },
  },
});

export const checkbox = css`
  min-width: 16px;
  min-height: 16px;
  border-radius: 2px;
`;

export const regularBox = css`
  border: 1px solid #c5c7d0;
  background-color: transparent;
`;

export const disabledBox = css`
  background-color: rgba(230, 233, 239, 0.4);
`;

export const checkedBox = css`
  background-color: #0073ea;
  background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.1), hsla(0, 0%, 100%, 0));
  &&::before {
    display: block;
    width: 16px;
    height: 16px;
    background-image: url(${checkedIcon});
    content: '';
  }
`;

export const disabledCheckedBox = css`
  background-color: rgba(230, 233, 239, 0.4);
  &&::before {
    display: block;
    width: 16px;
    height: 16px;
    background-image: url(${disabledCheckedIcon});
    content: '';
  }
`;
