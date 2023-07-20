import { css } from '@emotion/react';
import { SxProps } from '@mui/system';
import { Size } from '../../../common/enum';
import styled, { StyledComponent } from '@emotion/styled';
import { TextField as MUITextField, TextFieldProps, Theme } from '@mui/material';
import { MUIStyledCommonProps } from '@mui/system';

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

export const TextField: StyledComponent<TextFieldProps & MUIStyledCommonProps<Theme>, {}, {}> =
  styled(MUITextField)({
    borderRadius: '4px',
    color: '#808591',
    // backgroundColor: '#FFFFFF',
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
      paddingRight: 'unset',
      backgroundColor: 'transparent',
    },
    '& .Mui-disabled': {
      backgroundColor: '#E8EAED',
      color: '#B5B8BF',
    },
    '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: '#D6D9DE !important',
    },
  });
