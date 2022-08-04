import styled from '@emotion/styled';
import {
  Checkbox,
  Radio,
  styled as MUIStyled,
  TableSortLabel as MUITableSortLabel,
  Toolbar,
  Tooltip,
} from '@mui/material';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const areEqual = (prevProps: any, nextProps: any) =>
  prevProps.checked === nextProps.checked && prevProps.indeterminate === nextProps.indeterminate;

const TableBorder = styled.div`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 80%;
    background: #ced5df;
  }
`;

export const WrapBox = styled.div<{ useWrap: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  min-height: ${(props) => props.useWrap && '250px'};
  border-radius: ${(props) => props.useWrap && '4px'};
  padding: ${(props) => props.useWrap && '8px'};
  box-shadow: ${(props) => props.useWrap && '0 1px 3px 1px #0000001a'};
  & .use-toolbar {
    height: calc(100% - 38px);
  }
  & .use-pagination {
    height: calc(100% - 40px);
  }
  & .use-pagination.use-toolbar {
    height: ${(props) => (props.useWrap ? 'calc(100% - 88px)' : 'calc(100% - 78px)')};
  }
  & .table-wrap {
    & .use-pagination {
      height: unset;
    }
  }
  & .db-table-head-row:nth-child(1) div:nth-child(n + 3) {
    text-align: center;
  }
  & .table-wrap {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: auto;
  }
  & .tableTable {
    border-spacing: 0;
    height: 100%;
    font-family: Roboto Helvetica Arial sans-serif;
    overflow-x: auto;
  }
  & .tableHead {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    max-height: 0;
    width: calc(100% - 2px);
    min-width: fit-content;
  }
`;

export const TableHeadRow = styled.div`
  outline: 0;
  vertical-align: middle;
  font-size: 13px;
  color: #0e131a;
  background-color: #edf2f6;
  font-weight: 500;
  position: relative;
  box-shadow: inset 0 -1px 0 0 #dbdbdb inset 0 1px 0 0 #dbdbdb;
  & :hover {
    opacity: 1;
  }
`;

export const TableSortLabelWrap = styled.div<{ useColumnBorder: boolean }>`
  border-right: ${(props) => (props.useColumnBorder ? '1px solid #dbdbdb' : 'none')};
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TableLabel = styled.div<{ align: string }>`
  text-align: ${(props) => (props.align ? props.align : 'left')};
  width: 100%;
`;

export const TableBody = styled.div`
  padding-bottom: 10px;
  padding-top: 8px;
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  flex-direction: column;
  min-height: 50px;
  max-height: calc(100% - 40px);
  overflow-y: auto;
  min-width: fit-content;

  & .tableRow {
    color: #191f28;
    outline: 0;
    vertical-align: middle;
    & :hover > div {
      background-color: rgba(34, 139, 230, 0.06);
    }
    & .rowSelected > div {
      background-color: rgba(34, 139, 230, 0.12);
    }
    & .cellIcon {
      & svg {
        width: 16px;
        height: 16px;
        margin-top: 3px;
      }
    }
  }

  & .disabledCell {
    opacity: 0.4;
    pointer-events: none;
  }

  & .tableCell {
    padding-left: 10px;
    padding-right: 10px;
    min-height: 36px;
    text-align: left;
    vertical-align: inherit;
    & :first-child {
      padding-left: 16px;
    }
    & > a {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const NoDataDiv = styled.div`
  color: #8995ae;
  text-align: center;
  font-size: 13px;
`;

export const TableSortLabel = MUIStyled(MUITableSortLabel)({
  whiteSpace: 'nowrap',
  display: 'block',
  width: '100%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  '& .MuiTableSortLabel-icon': {
    width: 18,
    height: 18,
    position: 'absolute',
    bottom: 0,
    marginLeft: 2,
  },
  // '& .iconDirectionAsc': {
  //   transform: 'rotate(90deg)',
  // },
  // '& .iconDirectionDesc': {
  //   transform: 'rotate(180deg)',
  // },
});

export const TableHeadCell = styled.div`
  padding-left: 10px;
  font-size: 13px;
  text-align: left;
  height: 40px;
  vertical-align: inherit;
  color: #191f28;
  &:first-child {
    padding-left: 16px;
  }
  background-color: #edf2f6;
`;

export const HeaderCheckbox = React.memo(
  MUIStyled(Checkbox)({
    fontSize: '1rem',
    margin: '-8px 0 -8px -15px',
    width: '36px',
    height: '36px',
    padding: '8px 9px',
    '& svg': {
      width: '16px',
      height: '16px',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }),
  areEqual,
);

export const RowCheckbox = React.memo(
  MUIStyled(Checkbox)({
    fontSize: '14px',
    margin: '-9px 0 -8px -15px',
    padding: '8px 9px 9px 9px',
    width: '36px',
    height: '36px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& svg': {
      width: 16,
      height: 16,
    },
  }),
);

export const RowRadio = React.memo(
  MUIStyled(Radio)({
    fontSize: '14px',
    margin: '-9px 0 -8px -15px',
    padding: '8px 9px 9px 9px',
    width: '36px',
    height: '36px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& svg': {
      width: 16,
      height: 16,
    },
    '& .radioIcon': {
      borderRadius: '50%',
      width: 12,
      height: 12,
      boxShadow: 'inset 0 0 0 1px #8995ae, inset 0 -1px 0 #8995ae',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
    },
    '& .radioCheckedIcon': {
      backgroundColor: '#4285f4',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      boxShadow: 'inset 0 0 0 1px #4285f4, inset 0 -1px 0 #4285f4',
      '&:before': {
        display: 'block',
        width: 12,
        height: 12,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
    },
  }),
);

export const MUIToolbar = MUIStyled(Toolbar)({
  display: 'flex',
  minHeight: '48px',
  justifyContent: 'space-between',
  paddingLeft: 10,
  '& .input-wrap': {
    position: 'relative',
    '& .isSearchStyle': {
      width: 400,
    },
  },
  '& .search-input-clear': {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 0,
    width: 16,
    height: 16,
  },
  '& .right-buttons': {
    marginRight: '-15px',
    display: 'flex',
  },
});

export const MUITooltip = MUIStyled(Tooltip)({
  '& .MuiTooltip-arrow': {
    color: 'rgba(0,0,0,0.6)',
  },
  '& .MuiTooltip-tooltip': {
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginLeft: '5px',
  },
  '& .rightIcons': {
    padding: 8,
    width: 40,
    height: 40,
  },
  '& .leftIcons': {
    '&:first-of-type': {
      marginLeft: -12,
    },
  },
});
