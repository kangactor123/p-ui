import React, { ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import Button from '../../Button';

export const noDataComponentWithoutButtonByMessage = (message: string): ReactElement => (
  <>
    <div>{message}</div>
  </>
);

export const nodataStyle = css`
  margin-top: 16px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 13px;
  padding-right: 16px;
  padding-left: 12px;
  height: 32px;
  color: #58657f;
  box-shadow: none;
  background-color: #dbdee4;

  &:hover {
    background-color: #ecedf0;
    box-shadow: none;
  }

  & .MuiButton-endIcon {
    color: #58657f;
    margin-left: 4;
  }
`;

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
        <Button
          color="primary"
          variant="outlined"
          size="small"
          disabled={buttonDisabled}
          onClick={buttonOnClick}
          css={nodataStyle}
        >
          {buttonTitle || ''}
        </Button>
      ) : null}
    </>
  );
}
