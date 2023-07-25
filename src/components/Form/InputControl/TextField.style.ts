import { css } from '@emotion/react';
import { SxProps } from '@mui/system';
import { Size } from '../../../common/enum';
import { Theme } from '@mui/material';

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

export const iconClearBtn = css`
  padding: 0 12px 0 0;
`;

export function getInputStyleBySize(inputSize: 'large' | 'medium' | 'small'): SxProps<Theme> {
  return {
    padding:
      inputSize === Size.L
        ? '20px 0 20px 12px'
        : inputSize === Size.M
        ? '14px 0 14px 12px'
        : '6px 0 6px 12px',
    minHeight: inputSize === Size.L ? '20px' : inputSize === Size.M ? '20px' : '20px',
  };
}
