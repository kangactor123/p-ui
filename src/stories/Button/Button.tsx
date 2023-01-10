import React, { ReactElement, useContext } from 'react';
import { Button as MUIButton, ButtonProps, Theme, ThemeProvider } from '@mui/material';
import { css } from '@emotion/react';
import { PlayceThemeContext } from '../../providers';

type TButtonProps = {
  buttonRef?: any;
} & ButtonProps;

function Button({ buttonRef, ...props }: TButtonProps): ReactElement {
  const theme = useContext(PlayceThemeContext);
  return (
    <ThemeProvider theme={theme as Theme}>
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
  variant: 'outlined',
};

export default Button;
