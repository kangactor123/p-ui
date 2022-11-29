import React, { ReactElement } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import Button from '../../Button';
import styled from '@emotion/styled';

export const noDataComponentWithoutButtonByMessage = (message: string): ReactElement => (
  <>
    <div>{message}</div>
  </>
);

const NoDataWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
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
    <NoDataWrapper>
      <div css={style}>{message}</div>
      {buttonDisplay && buttonOnClick ? (
        <Button
          color="primary"
          variant="outlined"
          size="small"
          disabled={buttonDisabled}
          onClick={buttonOnClick}
          // css={nodataStyle}
        >
          {buttonTitle || ''}
        </Button>
      ) : null}
    </NoDataWrapper>
  );
}
