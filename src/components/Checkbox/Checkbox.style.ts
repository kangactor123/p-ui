import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FormControlLabel as MUIFormControlLabel } from '@mui/material';

export const FormControlLabel = styled(MUIFormControlLabel)<{ useEllipsis: boolean }>`
  ${({ useEllipsis }) =>
    useEllipsis &&
    css`
      .MuiFormControlLabel-label,
      span:last-of-type {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `}
`;
