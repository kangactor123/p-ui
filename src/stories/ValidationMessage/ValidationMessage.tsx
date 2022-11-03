import React, { ReactElement } from 'react';
import { cx } from '@emotion/css';
import { IconValidationError, IconValidationSuccess } from '../icons';
import { helperStyle } from './ValidationMessage.style';

export interface IValidationMessageProps {
  text: string;
  isError: boolean;
}

function ValidationMessage({ text, isError }: IValidationMessageProps): ReactElement {
  return (
    <div css={helperStyle}>
      {isError ? <IconValidationError className={cx('icon')} /> : <IconValidationSuccess className={cx('icon')} />}
      <div className={cx(['msg', isError ? 'err' : 'success'])}>{text}</div>
    </div>
  );
}

export default ValidationMessage;
