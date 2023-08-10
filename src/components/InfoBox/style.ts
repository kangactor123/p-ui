import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

const getStatusColor: { [key: string]: (theme: Theme) => string } = {
  information: (theme: Theme) => theme.palette.content.success.success50,
  success: (theme: Theme) => theme.palette.content.positive.positive50,
  warning: (theme: Theme) => theme.palette.content.warning.warning50,
  error: (theme: Theme) => theme.palette.content.negative.negative50,
};

export const InfoBoxWrap = styled.div<{ status: 'information' | 'success' | 'warning' | 'error' }>`
  width: 100%;
  padding: 15px 18px 15px 20px;
  background-color: ${({ theme, status }) => getStatusColor[status](theme)};
  border-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Title = styled.div(({ theme }) => ({
  ...theme.typo.h6,
  color: theme.palette.text.dark,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

export const statusIcon = css`
  width: 20px;
  height: 20px;
`;

export const closeIcon = css`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 24px;
  height: 16px;
  min-width: 24px;
  min-height: 24px;
`;

export const Content = styled.div(({ theme }) => ({
  ...theme.typo.p4,
  color: theme.palette.text.dark,
  marginLeft: '28px',
}));
