import React, { ReactElement } from 'react';
import { Button as MUIButton, ButtonProps } from '@mui/material';
import { ThemeProvider } from '../../providers';
import { cx } from '@emotion/css';

export type TButtonProps = {
  buttonRef?: any;
  onlyIcon?: boolean;
} & ButtonProps;

function Button(props: TButtonProps): ReactElement {
  const {
    buttonRef,
    className,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    disableRipple = true,
    onlyIcon,
  } = props;

  return (
    <ThemeProvider>
      <MUIButton
        ref={buttonRef}
        className={cx(onlyIcon && 'onlyIcon', className)}
        variant={variant}
        color={color}
        size={size}
        disableRipple={disableRipple}
        {...props}
      />
    </ThemeProvider>
  );
}

export default Button;
