import { css } from '@emotion/react';
import { StyledComponent } from '@emotion/styled';
import { styled } from '@mui/material';
import searchIcon from '../../stories/icons/svg/icon-search.svg';
import Checkbox, { ICheckboxProps } from '../Checkbox';
import Radio, { IRadioProps } from '../Radio';

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
    borderBottom: '2px solid #DFE1E6',
    '&:hover $resizeHandle': {
      opacity: 1,
    },
  }),
  tableHeadCell: css({
    paddingLeft: '5px',
    textAlign: 'left',
    paddingBottom: '15px',
    verticalAlign: 'inherit',
    color: '#666666',
    overflow: 'hidden',
    '&:first-of-type': {
      paddingLeft: '16px',
    },

    '& .MuiIconButton-root': {
      padding: '5px',
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
    color: '#202020',
    fontWeight: 400,
    fontSize: '14px',
    outline: 0,
    verticalAlign: 'middle',
    '&:hover > div': {
      backgroundColor: '#F5F6F8',
    },
    '&.rowSelected > div': {
      backgroundColor: 'rgba(204, 229, 255, 0.35)',
    },
    '&.rowLine': {
      borderBottom: '2px solid #DFE1E6',
    },
    '&.rowLine_isExpand': {
      borderBottom: '0',
    },
  }),
  tableCell: css({
    paddingLeft: '5px',
    paddingRight: '5px',
    textAlign: 'left',
    verticalAlign: 'inherit',
    lineHeight: '22px',
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
    alignItems: 'center',
  }),

  tableSortLabel: css({
    whiteSpace: 'nowrap',
    height: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    gap: '6px',
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
    gap: '5px',
    width: '100%',
    flexDirection: 'column',
    maxHeight: 'calc(100% - 40px)',
    overflowY: 'auto',
    minWidth: 'fit-content',
  }),
  noDataTableBody: css({
    minHeight: '144px',
    height: '80%',
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
    paddingLeft: '5px',
    fontSize: '14px',
    textAlign: 'left',
    height: '36px',
    verticalAlign: 'inherit',
    color: '#666666',
    '&:first-of-type': {
      paddingLeft: '16px',
    },

    // '& .MuiIconButton-root': {
    //   padding: '0px',
    // },
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
    color: '#202020',
    fontWeight: 400,
    fontSize: '14px',
    outline: 0,
    verticalAlign: 'middle',
    '&:not(:last-of-type)': {
      borderBottom: '1px solid #dbdbdb',
      backgroundColor: '#ffffff',
    },
    '&.rowSelected > div': {
      backgroundColor: 'rgba(204, 229, 255, 0.35)',
    },
    '&.rowLine': {
      borderBottom: '2px solid #DFE1E6',
    },
    '&.rowLine_isExpand': {
      borderBottom: '0',
    },
  }),
  tableCell: css({
    paddingLeft: '5px',
    paddingRight: '5px',
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
    gap: '5px',
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
  noDataTableBody: css({
    minHeight: '144px',
    height: '80%',
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
    padding-top: 20px;
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

    & .row_line_body {
      padding-top: 0;
      padding-bottom: 0;
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

  .no-data {
    color: #8995ae;
    width: 100%;
    height: 100%;
    min-height: 144px;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;
    line-height: 22px;
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
    height: 30px !important;
    width: auto;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #e6e9ef;
    }

    .MuiFormControlLabel-root {
      /* position: absolute; */
      /* left: 22px; */
      min-width: 100%;
      margin-left: unset;
      margin-right: unset;
    }
  }

  .filter-label {
    width: 100%;
    padding: 0;
    margin: 0;

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

export const HeaderCheckbox: StyledComponent<ICheckboxProps, {}, {}> = styled(Checkbox)({});

export const RowCheckbox: StyledComponent<ICheckboxProps, {}, {}> = styled(Checkbox)({
  paddingTop: '6px',
});

export const RowRadio: StyledComponent<IRadioProps, {}, {}> = styled(Radio)({
  paddingTop: '3px',
});
