/* eslint-disable @typescript-eslint/ban-types */
import {
  TablePagination as MUITablePagination,
  styled as MUIStyled,
  Pagination as MUIPagination,
} from "@mui/material";
import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo,
} from "react";
import { TableInstance } from "react-table";
// import { TableState } from "react-table";

export const ALL_VALUE = 100000000;

// avoid all of the redraws caused by the internal withStyles
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const interestingPropsEqual = (prevProps: any, nextProps: any) =>
  prevProps.count === nextProps.count &&
  prevProps.rowsPerPage === nextProps.rowsPerPage &&
  prevProps.page === nextProps.page &&
  prevProps.onChangePage === nextProps.onChangePage &&
  prevProps.onRowsPerPageChange === nextProps.onRowsPerPageChange;

// a bit of a type hack to keep OverridableComponent working as desired
type T = typeof MUITablePagination;
const MuiTablePagination = MUIStyled(MUITablePagination)({
  "& .toolbar": {
    minHeight: "40px",
  },
});

const Pagination = MUIStyled(MUIPagination)({
  "& .MuiPagination-root": {
    fontSize: "12px",
    paddingTop: 10,
    paddingRight: 24,
    width: "100%",
    minHeight: "40px",
    minWidth: "7px",
    "& > ul": {
      float: "right",
    },
    "& ul > li": {
      color: "#BABCBF",
    },
    "& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)":
      {
        backgroundColor: "transparent",
        color: "#BABCBF",
        "&:hover": {
          backgroundColor: "#dfe1e4",
        },
      },
    "& li > button": {
      minWidth: "7px",
      padding: "0 10px",
      fontSize: "12px",
      height: "28px",
    },
    "& .Mui-selected": {
      backgroundColor: "transparent",
      fontWeight: "500",
      color: "#75797E",
      padding: "0 10px",
    },
  },
});

// const paginationStyle = createMuiTheme({
//   overrides: {
//     MuiTablePagination: {
//       root: {
//         color: "rgba(25, 31, 40, 0.6)",
//         opacity: "0.6",
//       },
//       select: {
//         opacity: "1",
//         fontWeight: "bold",
//       },
//     },
//   },
// });

export function TableNumberPagination<T extends object>({
  instance,
  pageQueryEnabled,
  isLeft,
  usePerPage,
  totalCount,
  onChangePage,
  onChangePageInfo,
  isSubRowStyle,
  useAll,
}: PropsWithChildren<{
  instance: TableInstance<T>;
  pageQueryEnabled: boolean;
  isLeft: boolean;
  usePerPage: boolean;
  totalCount?: number;
  onChangePage?: any;
  onChangePageInfo?: any;
  isSubRowStyle: boolean;
  useAll?: boolean;
}>): ReactElement | null {
  //   const history = useHistory();
  //   const { t } = useTranslation();
  //   const numberClasses = useNumberStyles();
  const {
    state: { pageIndex, pageSize, rowCount = instance.rows.length },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = instance;

  const rowsPerPageOptionsData = useMemo(() => {
    return [
      { value: 5, label: "5" },
      { value: 10, label: "10" },
      { value: 25, label: "25" },
      { value: 50, label: "50" },
    ];
  }, []);

  const rowsPerPageOptions = useMemo(() => {
    return useAll
      ? [...rowsPerPageOptionsData, { value: ALL_VALUE, label: "All" }]
      : rowsPerPageOptionsData;
  }, [useAll]);

  const changePageInfo = useCallback(
    (pageSizeNum: number, pageIndexNum: number) => {
      if (onChangePageInfo) {
        onChangePageInfo({
          pageSize: pageSizeNum,
          pageIndex: pageIndexNum <= 0 ? 0 : pageIndexNum - 1,
        });
      }
    },
    [onChangePageInfo]
  );

  const handleNumberChangePage = useCallback(
    (
      event:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.ChangeEvent<unknown>
        | null,
      newPage: number
    ) => {
      gotoPage(newPage - 1);
      if (onChangePage instanceof Function) {
        onChangePage(newPage);
      }
      changePageInfo(pageSize, newPage);
    },
    [gotoPage, pageSize, changePageInfo, onChangePage]
  );

  const handleChangePage = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      newPage: number
    ) => {
      if (pageQueryEnabled) {
        // history.push(
        //   history.location.pathname +
        //     (newPage > 0 ? `?page=${newPage + 1}` : "")
        // );
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
    [gotoPage, nextPage, pageIndex, pageQueryEnabled, previousPage]
  );

  const onRowsPerPageChange = useCallback(
    (e: any) => {
      setPageSize(Number(e.target.value));
      changePageInfo(Number(e.target.value), pageIndex);
    },
    [setPageSize, changePageInfo, pageIndex]
  );

  //   const useStyles = makeStyles((theme: any) => ({
  //     toolbar: {
  //       paddingLeft: isLeft ? "20px" : "24px",
  //     },
  //   }));

  //   const classes = useStyles();

  return (
    <div style={{ display: "flex" }}>
      {usePerPage ? (
        <MuiTablePagination
          //   classes={{ toolbar: classes.toolbar }}
          rowsPerPageOptions={rowsPerPageOptions}
          labelRowsPerPage={"Rows per page"}
          //   component="div"
          count={totalCount || rowCount}
          rowsPerPage={pageSize}
          page={pageIndex}
          onPageChange={handleChangePage}
          onRowsPerPageChange={onRowsPerPageChange}
          //   className={cx("pagination", { subTable: isSubRowStyle })}
        />
      ) : null}
      {/* <MuiThemeProvider theme={paginationStyle}> */}
      <Pagination
        count={Math.ceil((totalCount || rowCount) / pageSize)}
        boundaryCount={1}
        defaultPage={1}
        page={pageIndex + 1}
        onChange={handleNumberChangePage}
        //   className={cx("pagination", numberClasses.root, {
        //     subTable: isSubRowStyle,
        //   })}
      />
      {/* </MuiThemeProvider> */}
    </div>
  );
}
