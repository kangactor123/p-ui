import React, { ReactElement } from 'react';
import { SerializedStyles } from '@emotion/react';
import Button from '../../Button';

export const noDataComponentWithoutButtonByMessage = (message: string): ReactElement => (
  <>
    <div>{message}</div>
  </>
);

export function TableNoDataComponent({
  message,
  buttonTitle,
  buttonOnClick,
  style,
  buttonDisplay = true,
  buttonDisabled = false,
}: {
  message: string;
  buttonDisplay?: boolean;
  buttonTitle?: string;
  buttonOnClick?: () => void;
  buttonDisabled?: boolean;
  style?: SerializedStyles;
}): ReactElement {
  return (
    <>
      <div css={style}>{message}</div>
      {buttonDisplay && buttonOnClick ? (
        <Button color="primary" variant="outlined" size="small" disabled={buttonDisabled} onClick={buttonOnClick}>
          {buttonTitle || ''}
        </Button>
      ) : null}
    </>
  );
}
