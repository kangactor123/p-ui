import { css } from '@emotion/react';
import { StyledComponent } from '@emotion/styled';
import { Checkbox, CheckboxProps, Radio, RadioProps, styled } from '@mui/material';
import searchIcon from './icons/ic-app-search.svg';

export const tableMixin = {
  '@table-border': css`
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
  `,
};

export const tableStyles = {
  radioIcon: css({
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
  }),
  radioCheckedIcon: css({
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
  }),
  tableTable: css({
    borderSpacing: 0,
    height: '100%',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    overflowX: 'auto',
    fontSize: '14px',
  }),
  tableHeadRow: css({
    outline: 0,
    verticalAlign: 'middle',
    color: '#1b2635',
    fontWeight: 700,
    position: 'relative',
    '&:hover $resizeHandle': {
      opacity: 1,
    },
    borderBottom: '2px solid #DFE1E6',
  }),
  tableHeadCell: css({
    paddingLeft: '10px',
    textAlign: 'left',
    height: '40px',
    verticalAlign: 'inherit',
    color: '#191f28',
    overflow: 'hidden',
    '&:first-of-type': {
      paddingLeft: '16px',
    },
  }),
  resizeHandle: css({
    position: 'absolute',
    cursor: 'col-resize',
    zIndex: 99,
    opacity: 0,
    borderLeft: `1px solid #42a5f5`,
    borderRight: `1px solid #42a5f5`,
    height: '50%',
    top: '25%',
    transition: 'all linear 100ms',
    right: -2,
    width: 3,
    '&.handleActive': {
      opacity: '1',
      border: 'none',
      backgroundColor: '#42a5f5',
      height: 'calc(100% - 4px)',
      top: '2px',
      right: -1,
      width: 1,
    },
  }),
  tableRow: css({
    color: '#191f28',
    outline: 0,
    verticalAlign: 'middle',
    '&:hover > div': {
      backgroundColor: '#F5F6F8',
    },
    '&.rowSelected > div': {
      backgroundColor: 'rgba(204, 229, 255, 0.35)',
    },
  }),
  tableCell: css({
    paddingLeft: '10px',
    paddingRight: '10px',
    minHeight: '40px',
    textAlign: 'left',
    verticalAlign: 'inherit',
    '&:first-of-type': {
      paddingLeft: '16px',
    },
    '&>a': {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '&>div>span': {
      wordBreak: 'break-all',
    },
  }),
  tableSortLabelWrap: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),

  tableSortLabel: css({
    whiteSpace: 'nowrap',
    display: 'block !important',
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '& svg': {
      position: 'absolute',
      width: 18,
      height: 18,
      bottom: 0,
      marginLeft: 2,
    },
  }),
  headerIcon: css({
    '& svg': {
      width: 16,
      height: 16,
      marginTop: 4,
      marginRight: 0,
    },
  }),
  iconDirection: css`
    &.icon-direction-asc {
      transform: rotate(90deg);
    }
    &.icon-direction-desc {
      transform: rotate(180deg);
    }
  `,
  tableHead: css({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    maxHeight: '',
    width: 'calc(100% - 2px)',
    minWidth: 'fit-content',
  }),

  tableBody: css({
    paddingBottom: '10px',
    paddingTop: '8px',
    display: 'flex',
    flex: '1 1 auto',
    width: '100%',
    flexDirection: 'column',
    minHeight: '70px',
    maxHeight: 'calc(100% - 40px)',
    overflowY: 'auto',
    minWidth: 'fit-content',
  }),
  tableLabel: css({
    width: '100%',
  }),
  cellIcon: css({
    '& svg': {
      width: 16,
      height: 16,
      marginTop: 3,
    },
  }),
};

export const subTableStyles = {
  radioIcon: css({
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
  }),
  radioCheckedIcon: css({
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
  }),
  tableTable: css({
    borderSpacing: 0,
    height: '100%',
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    overflow: 'hidden',
    fontSize: '14px',
  }),
  tableHeadRow: css({
    outline: 0,
    verticalAlign: 'middle',
    fontSize: '13px',
    color: '#1b2635',
    fontWeight: 700,
    position: 'relative',
    boxShadow: 'inset 0 -1px 0 0 #dbdbdb, inset 0 1px 0 0 #dbdbdb',
    '&:hover $resizeHandle': {
      opacity: 1,
    },
  }),
  tableHeadCell: css({
    paddingLeft: '10px',
    fontSize: '14px',
    textAlign: 'left',
    height: '36px',
    verticalAlign: 'inherit',
    color: '#191f28',
    '&:first-of-type': {
      paddingLeft: '16px',
    },
  }),
  resizeHandle: css({
    position: 'absolute',
    cursor: 'col-resize',
    zIndex: 100,
    opacity: 0,
    borderLeft: `1px solid #42a5f5`,
    borderRight: `1px solid #42a5f5`,
    height: '50%',
    top: '25%',
    transition: 'all linear 100ms',
    right: -2,
    width: 3,
    '&.handleActive': {
      opacity: '1',
      border: 'none',
      backgroundColor: '#42a5f5',
      height: 'calc(100% - 4px)',
      top: '2px',
      right: -1,
      width: 1,
    },
  }),
  tableRow: css({
    color: '#191f28',
    outline: 0,
    verticalAlign: 'middle',
    '&:not(:last-of-type)': {
      borderBottom: '1px solid #dbdbdb',
      backgroundColor: '#ffffff',
    },
    '&.rowSelected > div': {
      backgroundColor: 'rgba(204, 229, 255, 0.35)',
    },
  }),
  tableCell: css({
    paddingLeft: '10px',
    paddingRight: '10px',
    minHeight: '36px',
    textAlign: 'left',
    verticalAlign: 'inherit',
    '&:first-of-type': {
      paddingLeft: '16px',
    },
    '&>a': {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
  tableSortLabelWrap: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  tableSortLabel: css({
    display: 'block',
    whiteSpace: 'nowrap',
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '& svg': {
      width: 18,
      height: 18,
      position: 'absolute',
      bottom: 0,
      marginLeft: 2,
    },
  }),
  headerIcon: css({
    '& svg': {
      width: 16,
      height: 16,
      marginTop: 4,
      marginRight: 0,
    },
  }),
  iconDirection: css`
    &.icon-direction-asc {
      transform: rotate(90deg);
    }
    &.icon-direction-desc {
      transform: rotate(180deg);
    }
  `,
  tableHead: css({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    maxHeight: '',
    width: 'calc(100% - 2px)',
    minWidth: 'fit-content',
  }),

  tableBody: css({
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flex: '1 1 auto',
    borderBottom: '1px solid #dbdbdb',
    flexDirection: 'column',
    maxHeight: 'calc(100% - 40px)',
    minHeight: '36px',
    overflowY: 'auto',
    overflowX: 'hidden',
    minWidth: 'fit-content',
    backgroundColor: '#fff',
    fontSize: '14px',
  }),
  cellIcon: css({
    '& svg': {
      width: 16,
      height: 16,
      marginTop: 3,
    },
  }),
};

export const tableWrapStyles = css`
  &.wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 250px;
    position: relative;
    border-radius: 4px;
    background-color: #ffffff;
    padding: 8px;
    box-shadow: 0 1px 3px 1px #0000001a;
    .use-toolbar {
      height: calc(100% - 38px);
    }
    .use-pagination.use-toolbar {
      height: calc(100% - 88px);
    }
    .use-pagination {
      height: calc(100% - 40px);
    }
  }

  &.noWrapBox {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
    .use-pagination.use-toolbar {
      height: calc(100% - 78px);
    }
    .table-wrap {
      &.use-pagination {
        height: unset;
      }
    }
  }

  .table-wrap {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: auto;

    :global(.MuiButton-label) {
      font-size: 12px;
    }
  }

  .search {
    position: relative;
  }

  .search-input {
    width: 300px;
    height: 32px;
    background-color: #fafbfc;
  }

  .search-input input {
    padding: 5px 16px;
    font-size: 14px;
  }

  .search-input-clear {
    padding: 2px;
  }

  .fix-column-border {
    ${tableMixin['@table-border']}
    height: 100%;
  }

  .disabledCell {
    opacity: 0.4;
    pointer-events: none;
  }

  .row-status-failed {
    border-left: 4px solid #ea0000;
    margin-bottom: 2px;
  }

  .row-status-canceled {
    border-left: 4px solid #8792a9;
    margin-bottom: 2px;
  }

  .row-status-completed {
    border-left: 4px solid #009726;
    margin-bottom: 2px;
  }

  .row-status-in-progress {
    border-left: 4px solid #2587ff;
    margin-bottom: 2px;
  }

  .row-status-padding {
    border-left: 4px solid '#e98f00';
    margin-bottom: 2px;
  }

  .csv-download-container {
    float: right;
  }

  .small-table-no-data {
    margin-top: 20px;
    width: 100%;
    text-align: center;
    color: #8995ae;
    min-height: 30px;
    font-size: 13px;
  }

  .no-data {
    color: #8995ae;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
`;

export const filterStyle = css`
  .filter-popover {
    padding: 10px 0;
    width: 220px;
    min-width: 220px;
  }

  .search {
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
  }

  .search-input {
    border-bottom: 0;
    width: 100%;
    height: 100%;

    input {
      color: #191f28;
      padding: 11px 10px 10px;
      font-size: 14px;
      padding-left: 35px;
      padding-right: 28px;
      height: 30px;
      box-sizing: border-box;
    }
  }

  .search-input::before {
    position: absolute;
    top: 4px;
    left: 10px;
    content: url(${searchIcon});
  }

  .search-input input::placeholder {
    font-style: italic;
    color: rgba(25, 31, 40, 0.4);
  }

  .filter-item-all {
    width: auto;
    margin-top: 10px;
    margin: 10px 10px 0;
  }

  .filter-item {
    padding: 0 10px;
    width: 100%;
  }

  .filter-item,
  .filter-item-all {
    height: 30px;
    width: auto;
  }

  .filter-label {
    width: 100%;
    padding: 0;
    margin: 0;

    &:hover {
      background-color: #eee;
    }

    span:last-child {
      white-space: nowrap;
      overflow: hidden;
      max-width: calc(100% - 40px);
      text-overflow: ellipsis;
      font-size: 14px;
    }
  }

  .filter-checkbox {
    width: 30px;
    height: 30px;
  }

  .filter-items {
    margin-top: 4px;
    padding: 0;
    min-width: 180px;
    height: 210px;
    max-width: 600px;
    overflow: hidden;
  }

  .filter-split {
    height: 1px;
    box-shadow: 0 1px 0 0 #d8d8d8;
    margin-top: 2px;
  }
`;

export const HeaderCheckbox: StyledComponent<CheckboxProps, {}, {}> = styled(Checkbox)({
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
  color: '#c4cad6',
});

export const RowCheckbox: StyledComponent<CheckboxProps, {}, {}> = styled(Checkbox)({
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
  color: '#c4cad6',
});

export const RowRadio: StyledComponent<RadioProps, {}, {}> = styled(Radio)({
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
});
