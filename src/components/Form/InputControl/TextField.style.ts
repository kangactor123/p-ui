import { css } from '@emotion/react';
import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import { Size } from '../../../common/enum';

export const iconButtonCss = css`
  width: 20px;
  height: 20px;
  padding: 0;

  &.MuiButtonBase-root.MuiIconButton-root {
    width: 20px;
    height: 20px;
    padding: 0;
  }
`;

export function getInputStyleBySize(inputSize: 'large' | 'medium' | 'small'): SxProps<Theme> {
  return {
    padding: inputSize === Size.L ? '13px 15px' : inputSize === Size.M ? '9px 15px' : '5px 15px',
    minHeight: inputSize === Size.L ? '48px' : inputSize === Size.M ? '40px' : '32px',
  };
}
