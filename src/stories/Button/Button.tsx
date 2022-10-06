import React, { ReactElement } from 'react';
import { Button as MUIButton, ButtonProps } from '@mui/material';
import { css } from '@emotion/react';

export interface IButtonProps extends ButtonProps {}

function Button(props: IButtonProps): ReactElement {
  return (
    <MUIButton
      {...props}
      css={css`
        text-transform: none;
      `}
    >
      {props.children}
    </MUIButton>
  );
}

Button.defaultProps = {
  variant: 'outlined',
};

export default Button;
