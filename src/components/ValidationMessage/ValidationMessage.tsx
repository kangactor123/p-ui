import React, { ReactElement, useContext } from 'react';
import { cx } from '@emotion/css';
import { ErrorIcon, SuccessIcon } from '../icons';
import { helperStyle } from './ValidationMessage.style';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

export interface IValidationMessageProps {
  text: string;
  isError: boolean;
}

function ValidationMessage({ text, isError }: IValidationMessageProps): ReactElement {
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <div css={helperStyle}>
        {isError ? <ErrorIcon /> : <SuccessIcon />}
        <div className={cx(['msg', isError ? 'err' : 'success'])}>{text}</div>
      </div>
    </ThemeProvider>
  );
}

export default ValidationMessage;
