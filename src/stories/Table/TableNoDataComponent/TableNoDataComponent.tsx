import React, { ReactElement } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { IconTableArrowRightCurrentColor } from '../icons';
import { css, SerializedStyles } from '@emotion/react';

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
  type,
  message,
  buttonTitle,
  buttonOnClick,
  style,
  buttonDisplay = true,
  buttonDisabled = false,
}: {
  type: string;
  buttonDisplay?: boolean;
  buttonOnClick?: () => void;
  buttonDisabled?: boolean;
  buttonTitle?: string;
  message?: string;
  style?: SerializedStyles;
}): ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <div css={style}>{message || t('You do not have any {{type}}.', { type })}</div>
      {buttonDisplay && buttonOnClick ? (
        <Button
          color="primary"
          variant="text"
          disabled={buttonDisabled}
          onClick={buttonOnClick}
          endIcon={<IconTableArrowRightCurrentColor />}
          css={nodataStyle}
        >
          {buttonTitle ? t(buttonTitle) : t('Add {{type}}', { type })}
        </Button>
      ) : null}
    </>
  );
}
