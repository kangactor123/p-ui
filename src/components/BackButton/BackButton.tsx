import React, { ReactElement } from 'react';
import { css } from '@emotion/react';
// import { useTranslation } from 'react-i18next';

export interface IBackButtonProps {
  //Todo: define props
  sample: string;
}

const wrapperStyle = css`
  width: 100%;
  height: 100%;
`;

function BackButton(props: IBackButtonProps): ReactElement {
  // const { t } = useTranslation();

  return <div css={wrapperStyle}>Component</div>;
}

export default BackButton;
