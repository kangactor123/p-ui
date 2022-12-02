import { TSize } from '../../common/type';
import { styled as MUIStyled, Menu as MuiMenu } from '@mui/material';
import styled from '@emotion/styled';

export const Menu: any = MUIStyled(MuiMenu)<{ size: TSize | 'mini' }>(({ size }) => ({
  '& .MuiPaper-root': {
    boxShadow: 'none',
    filter: 'drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.2))',
    borderRadius: '8px',
    transform: 'translateY(10px) !important',
    maxHeight: 'fit-content',
  },
  '& .MuiList-root': {
    padding: 0,
    minWidth:
      size === 'mini'
        ? '160px'
        : size === 'small'
        ? '200px'
        : size === 'medium'
        ? '220px'
        : size === 'large'
        ? '240px'
        : size,
  },
}));

export const MenuList = styled.li``;

export const SplitLine = styled.hr`
  border: 0.5px solid #e6e9ef;
  margin: 0;
`;

export const Header = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #808080;
  padding: 8px 0 4px 16px;
  border-bottom: 1px solid #e6e9ef;
  margin-bottom: 3px;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;
