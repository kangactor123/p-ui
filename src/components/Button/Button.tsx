import React, { ReactElement } from 'react';
import { Button as MUIButton, ButtonProps } from '@mui/material';
import { ThemeProvider } from '../../providers';
import { cx } from '@emotion/css';

export type TButtonProps = {
  buttonRef?: any;
  onlyIcon?: boolean;
} & ButtonProps;

function Button({ buttonRef, className, onlyIcon, ...props }: TButtonProps): ReactElement {
  return (
    <ThemeProvider>
      <MUIButton
        {...props}
        ref={buttonRef}
        disableRipple
        className={cx(onlyIcon && 'onlyIcon', className)}
      />
    </ThemeProvider>
  );
}

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  size: 'medium',
};

export default Button;
