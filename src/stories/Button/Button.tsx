import React, { ReactElement, useContext } from 'react';
import { Button as MUIButton, ButtonProps as IButtonProps, ThemeOptions, ThemeProvider } from '@mui/material';
import { css } from '@emotion/react';
import { PlayceThemeContext } from '../../providers';

function Button(props: IButtonProps): ReactElement {
  const theme = useContext(PlayceThemeContext);
  return (
    <ThemeProvider theme={theme as ThemeOptions}>
      <MUIButton
        {...props}
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
