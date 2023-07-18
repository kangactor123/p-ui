import React, { ReactElement } from 'react';
import { cx } from '@emotion/css';
import { ErrorIcon, SuccessIcon } from '../icons';
import { helperStyle } from './ValidationMessage.style';

export interface IValidationMessageProps {
  text: string;
  isError: boolean;
}

function ValidationMessage({ text, isError }: IValidationMessageProps): ReactElement {
  return (
    <div css={helperStyle}>
      {isError ? <ErrorIcon /> : <SuccessIcon />}
      <div className={cx(['msg', isError ? 'err' : 'success'])}>{text}</div>
    </div>
  );
}

export default ValidationMessage;
