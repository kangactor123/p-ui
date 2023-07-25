import React, { ReactElement, useContext } from 'react';
import { Button as MUIButton, ButtonProps } from '@mui/material';
import { css } from '@emotion/react';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

type TButtonProps = {
  buttonRef?: any;
} & ButtonProps;

function Button({ buttonRef, ...props }: TButtonProps): ReactElement {
  const theme = useContext(PlayceThemeContext);
  return (
    <ThemeProvider theme={theme}>
      <MUIButton
        {...props}
        ref={buttonRef}
        css={css`
          text-transform: none;
        `}
      >
        {props.children}
      </MUIButton>
    </ThemeProvider>
  );
}

Button.defaultProps = {
  variant: 'd',
  children: 'Button',
  color: 'grey',
};

export default Button;
