import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TDefinitionType } from './DefinitionList';

export const ItemWrap = styled.div(({ type }: { type: TDefinitionType }) => ({
  display: 'flex',
  minHeight: '36px',
  width: type === 'single' ? '100%' : '50%',
  ...(type === 'multi' && {
    ...{
      ' &:nth-of-type(4n + 1),&:nth-of-type(4n + 2) ': {
        backgroundColor: 'rgba(137, 149, 174, 0.08)',
      },
    },
  }),
  ...(type === 'single' && {
    ...{
      '&:nth-of-type(4n + 1),&:nth-of-type(4n + 3)': {
        backgroundColor: 'rgba(137, 149, 174, 0.08)',
      },
    },
  }),
}));

export const Dl = styled.dl`
  display: flex;
  flex-flow: row wrap;
  font-size: 13px;
`;
export const Dt = styled.dt`
  padding: 9px 0 7px 12px;
  width: 140px;
  word-wrap: break-word;
  word-break: keep-all;
  color: rgba(25, 31, 40, 0.6);
  font-weight: 500;
`;

export const Dd = styled.dd`
  width: calc(100% - 140px);
  padding: 9px 0 7px 12px;
  color: #191f28;
  word-wrap: break-word;
  word-break: keep-all;
`;
