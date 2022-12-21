/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { TablePagination, createTheme, Pagination, ThemeProvider } from '@mui/material';
import React, { ChangeEvent, PropsWithChildren, ReactElement, useCallback, useMemo } from 'react';
import { TableInstance } from 'react-table';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cx } from '@emotion/css';
import { DropdownDownIcon } from '../icons';

export const ALL_VALUE = 100000000;

const wrapperCss = css`
  position: relative;
  display: flex;
  justify-content: center;
`;

const numberStyles = css({
  fontSize: '12px',
  paddingTop: 10,
  minHeight: '40px',
  minWidth: '7px',
  width: 'auto',
  '& > ul': {
    float: 'right',
  },
  '& ul > li': {
    color: '#BABCBF',
  },
  '& ul > li:not(:first-of-type ):not(:last-child) > button:not(.Mui-selected)': {
    backgroundColor: 'transparent',
    color: '#808080',
    transition: 'none',
    '&:hover': {
      backgroundColor: '#dfe1e4',
    },
  },
  '& li > button': {
    minWidth: '7px',
    padding: '0 10px',
    fontSize: '12px',
    height: '28px',
    '& span': {
      borderRadius: '3px',
    },
  },
  '& .Mui-selected': {
    backgroundColor: '#666666 !important',
    fontWeight: '500',
    color: '#ffffff',
    padding: '0 10px',
    borderRadius: '3px',
  },
  '& :hover': {
    borderRadius: '3px',
  },
});

const rowPerPageStyle = css`
  position: absolute;
`;

const paginationStyle = css`
  width: 100%;
  min-height: 45px;
  height: 45px;
  border-top: 2px solid #dfe1e6;
  overflow: hidden;
  display: flex;
  align-items: center;
  &.subTable {
    border: none;
    padding-top: 0px;
  }
`;

const paginationTheme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: '#666666',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: 'rgba(25, 31, 40, 0.6)',
          fontSize: '12px !important',
          overflow: 'hidden',
          paddingTop: '8px',
          boxSizing: 'border-box',
        },
        selectRoot: {
          borderRadius: '3px',
          border: 'solid 1px rgba(25, 31, 40, 0.4)',
          marginLeft: '8.5px',
          marginRight: '15.5px',
        },
        selectLabel: {
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '22px',
          color: '#666666',
        },
        select: {
          paddingLeft: '4px',
          paddingTop: '5px',
          paddingBottom: '5px',
          paddingRight: '20px !important',
          fontWeight: 400,
          minWidth: '47px !important',
          textAlign: 'left',
          textAlignLast: 'left',
          fontSize: 14,
          lineHeight: '22px',
        },
        selectIcon: {
          color: '#b3b4b8',
          top: 'calc(50% - 11px)',
        },
        actions: {
          '& >.MuiIconButton-root': {
            padding: '10px',
            width: '20px',
          },
        },
        toolbar: {
          paddingRight: '12px',
          minHeight: '32px !important',
          height: '32px',
          paddingLeft: '8px !important',
        },
        spacer: {
          display: 'none',
        },
        displayedRows: {
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '22px',
          color: '#666666',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          minWidth: '49px !important',
          maxWidth: '49px !important',

          '& .MuiList-root': {
            padding: '4px 2px',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '22px',
          padding: '5px 8px',
          borderRadius: '4px',
        },
      },
    },
  },
});

export function TableNumberPagination<TModel extends object>({
  instance,
  pageQueryEnabled,
  usePerPage,
  totalCount,
  onChangePage,
  onChangePageInfo,
  isSubRowStyle,
  useAll,
  siblingCount,
}: PropsWithChildren<{
  instance: TableInstance<TModel>;
  pageQueryEnabled: boolean;
  isLeft: boolean;
  usePerPage: boolean;
  totalCount?: number;
  onChangePage?: any;
  onChangePageInfo?: any;
  isSubRowStyle: boolean;
  useAll?: boolean;
  siblingCount?: number;
}>): ReactElement | null {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const {
    state: { pageIndex, pageSize, rowCount = instance.rows.length },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = instance;

  const rowsPerPageOptionsData = useMemo(() => {
    return [
      { value: 5, label: '5' },
      { value: 10, label: '10' },
      { value: 25, label: '25' },
      { value: 50, label: '50' },
    ];
  }, []);

  const rowsPerPageOptions = useMemo(() => {
    return useAll ? [...rowsPerPageOptionsData, { value: ALL_VALUE, label: t('All') }] : rowsPerPageOptionsData;
  }, [rowsPerPageOptionsData, t, useAll]);

  const changePageInfo = useCallback(
    (pageSizeNum: number, pageIndexNum: number) => {
      if (onChangePageInfo) {
        onChangePageInfo({
          pageSize: pageSizeNum,
          pageIndex: pageIndexNum <= 0 ? 0 : pageIndexNum - 1,
        });
      }
    },
    [onChangePageInfo],
  );

  const handleNumberChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.ChangeEvent<unknown> | null, newPage: number) => {
      gotoPage(newPage - 1);
      if (onChangePage instanceof Function) {
        onChangePage(newPage);
      }
      changePageInfo(pageSize, newPage);
    },
    [gotoPage, pageSize, changePageInfo, onChangePage],
  );

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
      if (pageQueryEnabled) {
        navigate(location.pathname + (newPage > 0 ? `?page=${newPage + 1}` : ''));
      }

      if (newPage === pageIndex + 1) {
        nextPage();
      } else if (newPage === pageIndex - 1) {
        previousPage();
      } else {
        gotoPage(newPage);
      }

      changePageInfo(pageSize, newPage);
    },
    [
      changePageInfo,
      gotoPage,
      location.pathname,
      navigate,
      nextPage,
      pageIndex,
      pageQueryEnabled,
      pageSize,
      previousPage,
    ],
  );

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPageSize(Number(e.target.value));
      changePageInfo(Number(e.target.value), pageIndex);
    },
    [setPageSize, changePageInfo, pageIndex],
  );

  return (
    <ThemeProvider theme={paginationTheme}>
      <div css={wrapperCss}>
        {usePerPage ? (
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            labelRowsPerPage={t('Rows per page')}
            component="div"
            count={totalCount || rowCount}
            rowsPerPage={pageSize}
            page={pageIndex}
            onPageChange={handleChangePage}
            onRowsPerPageChange={onRowsPerPageChange}
            SelectProps={{
              IconComponent: DropdownDownIcon,
            }}
            css={css`
              ${paginationStyle}
              ${rowPerPageStyle}
            `}
            className={cx({ subTable: isSubRowStyle })}
            ActionsComponent={() => null}
          />
        ) : null}
        <Pagination
          count={Math.ceil((totalCount || rowCount) / pageSize)}
          boundaryCount={1}
          siblingCount={siblingCount}
          defaultPage={1}
          page={pageIndex + 1}
          onChange={handleNumberChangePage}
          className={cx({ subTable: isSubRowStyle })}
          css={css`
            ${paginationStyle}
            ${numberStyles}
          `}
        />
      </div>
    </ThemeProvider>
  );
}
