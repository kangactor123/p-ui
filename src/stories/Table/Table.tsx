import { debounce, keyBy, mapValues } from 'lodash';
import React, {
  Fragment,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import {
  ActionType,
  Cell,
  HeaderGroup,
  IdType,
  Meta,
  Row,
  TableInstance,
  TableOptions,
  TableState,
  useTable,
} from 'react-table';
import { getGlobalFilteredRows } from './Filter/ColumnFilter';
import { ALL_VALUE, TableNumberPagination } from './Pagination/TableNumberPagination';
import { ResizeHandle } from './ResizeHandle';
import { TableBody, TableLabel, TableSortLabel, TableSortLabelWrap, WrapBox } from './style/table.style';
import { TableToolbar } from './Toolbar/TableToolbar';
import { useLocalStorage } from './utils';

/**
 * 작업 필요
 */

export interface ITable<T extends object = {}> extends TableOptions<T> {
  name: string;
  idColumn?: string | null;
  selectedRows?: (number | string)[];
  renderRowSubComponent?: (row: Row<T>) => ReactNode;
  selectDisabled?: (row: Row<T>) => boolean; //row disabled
  excludeDisabledColumns?: string[]; //row disabled
  searchNoDataComponent?: React.ReactNode;
  noDataComponent?: React.ReactNode;
  isSmallTable?: boolean;
  onAdd?: (instance: TableInstance<T>) => MouseEventHandler;
  onDelete?: (instance: TableInstance<T>) => MouseEventHandler;
  onEdit?: (instance: TableInstance<T>) => MouseEventHandler;
  onClick?: (row: Row<T>, instance: TableInstance<T>) => void;
  onRefresh?: (e: any) => void;
  onSearchKeyword?: (e: any) => void;
  onChangePage?: (e: any) => void;
  onChangePageSize?: (e: any) => void;
  onChangePageInfo?: (e: any) => void;
  onSelectionChange?: (rowIds: any, instance: TableInstance<T>) => void;
  totalCount?: number;
  useWrap?: boolean;
  useToolbar?: boolean;
  onlyDownload?: boolean;
  usePagination?: boolean;
  usePerPage?: boolean;
  pageNumber?: number;
  pageSize?: number | 'All';
  pageQueryEnabled?: boolean;
  useSelection?: boolean;
  allExpanded?: boolean;
  selectionType?: 'checkbox' | 'radio';
  tableDivProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  isRowStatus?: boolean;
  paginationComponent?: ReactNode;
  groupColumnStartIndex?: string[];
  centerGroupColumn?: string[];
  cellBackgroundColorColumn?: string[];
  isSubRowStyle?: boolean;
  isSelectionClearByFilterChange?: boolean;
  isSearchStyle?: boolean;
  useServerPaging?: boolean;
  isAllowManualSelection?: boolean;
  hiddenColumns?: string[];
  isVirtualScroll?: boolean;
  virtualScrollHeight?: number;
  rowHeight?: number;
  columnVisibleSettingExclude?: string[];
  searchKeyword?: string | null;
  useAll?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStyles = <T extends object>(props: any, disableResizing = false, align = 'left', useBorder = false) => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'center',
      display: 'flex',
      borderRight: useBorder ? '1px solid #dbdbdb' : 'none',
    },
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cellProps = <T extends object>(props: any, { cell }: Meta<T, { cell: Cell<T> }>) => {
  const column = cell.column as HeaderGroup<T> & { useColumnBorder?: boolean };
  return getStyles(props, column && column.disableResizing, column && column.align, column && column.useColumnBorder);
};

const getStatusClassName = (status: string) => {
  let className = '';
  if (status === AssessmentStatus.FAILED) {
    className = 'row-status-failed';
  } else if (status === AssessmentStatus.CANCELLED) {
    className = 'row-status-canceled';
  } else if (status === AssessmentStatus.COMPLETED) {
    className = 'row-status-completed';
  } else if (status === AssessmentStatus.IN_PROGRESS) {
    className = 'row-status-in-progress';
  } else if (status === AssessmentStatus.PENDING) {
    className = 'row-status-padding';
  }
  return className;
};

const defaultColumn = {
  // Filter: ColumnFilter,
  // filter: multiSelectFilter,
  // Cell: TooltipCell,
  minWidth: 30,
  width: 100,
};

export const exceptFilterColumnIds = [
  '_selector',
  'selector_',
  'expander',
  'topology',
  'assessmentReport',
  'jobDetails',
  'assessmentData',
];

export interface ITableProps {}

function Table<T extends object>(props: PropsWithChildren<ITable<T>>): ReactElement {
  const {
    name,
    idColumn = 'id',
    columns,
    onAdd,
    onDelete,
    onEdit,
    onClick,
    onRefresh,
    onSearchKeyword,
    onSelectionChange,
    onChangePage,
    onChangePageInfo,
    selectDisabled = (a: Row<T>) => false,
    groupColumnStartIndex = [],
    centerGroupColumn = [],
    cellBackgroundColorColumn = [],
    totalCount = undefined,
    excludeDisabledColumns = [],
    hiddenColumns = [],
    useWrap = true,
    useToolbar = true,
    usePagination = true,
    pageNumber = 1,
    pageSize: pageSizeProp,
    usePerPage = true,
    pageQueryEnabled = false,
    selectedRows = [],
    useSelection = true,
    allExpanded = false,
    selectionType = 'checkbox',
    isRowStatus = false,
    isSubRowStyle = false,
    isSmallTable = false,
    isSelectionClearByFilterChange = true,
    isSearchStyle = true,
    useServerPaging = false,
    isVirtualScroll = false,
    renderRowSubComponent,
    columnVisibleSettingExclude = [],
    searchKeyword = '',
    useAll = true,
  } = props;

  const [initialState, setInitialState] = useLocalStorage(`tableState:${name}`, {});
  const [useColumnFilter, setUseColumnFilter] = useState(!!initialState.useColumnFilter);

  const getRowId = idColumn ? (row: any = {}) => row[idColumn] : undefined;

  const filteredSelectedRows: any[] = selectedRows?.filter((id) =>
    props.data.some((item: any, index) => (getRowId instanceof Function ? id === getRowId(item) : id === item.id)),
  );
  const tireggerSelectionChange = useCallback(
    (ids: any[]) => {
      if (onSelectionChange instanceof Function) {
        onSelectionChange(ids, instance);
      }
    },
    [onSelectionChange],
  );

  const dispatchEvent = debounce((selectedRowIdArray: any[]) => {
    tireggerSelectionChange(selectedRowIdArray);
  }, 200);

  const selectedRowIds = selectedRows
    ? mapValues(
        keyBy(
          filteredSelectedRows.map((rowId) => ({ id: rowId })),
          'id',
        ),
        (row) => true,
      )
    : [];

  const onChangePageHandler = useCallback(
    (page: number) => {
      if (onChangePage instanceof Function) {
        onChangePage(page);
      }
    },
    [onChangePage],
  );

  const onChangePageInfoHanlder = useCallback(
    (pageInfo: any) => {
      if (onChangePageInfo instanceof Function) {
        onChangePageInfo(pageInfo);
      }
    },
    [onChangePageInfo],
  );

  const stateReducer = useCallback(
    (
      newState: Omit<TableState<T>, 'pageSize'> & { pageSize: 'All' | number },
      _action: ActionType,
      prevState: TableState<T>,
      instance: any,
    ): TableState<T> & { globalFilteredRows: Row<T>[] } => {
      const { selectedRowIds, globalFilter } = newState;
      const { selectedRowIds: prevSelectedRowIds } = prevState;
      const selectedRowIdArray = Object.keys(selectedRowIds || {});
      const prevSelectedRowIdArray = Object.keys(prevSelectedRowIds || {});
      if (
        selectedRowIdArray.length !== prevSelectedRowIdArray.length &&
        onSelectionChange instanceof Function &&
        (selectionType === 'checkbox' || selectedRowIdArray.length)
      ) {
        let idType = 'number';
        if (idColumn && instance && instance.rows[0] && selectedRowIdArray.length) {
          const row: any = instance.rows[0].original;
          idType = typeof row[idColumn];
        }
        if (idType === 'number') {
          dispatchEvent(
            selectedRowIdArray.map((id) => {
              // 방어코드 NaN으로 리턴될 경우 방지.
              const check = isNaN(Number(id));
              return check ? id : Number(id);
            }),
          );
        } else {
          dispatchEvent(selectedRowIdArray);
        }
      }

      const { initialRows = [], allColumns = [] } = instance || {};

      const { sortBy, filters, pageIndex, pageSize, columnResizing, hiddenColumns } = newState;
      const tablePageSize: number = pageSize === 'All' ? ALL_VALUE : pageSize;
      const globalFilteredRows = globalFilter
        ? getGlobalFilteredRows<T>(initialRows, allColumns, globalFilter)
        : initialRows;
      const val = {
        sortBy,
        filters,
        globalFilter,
        // pageIndex,
        pageSize: tablePageSize as number,
        hiddenColumns,
        columnResizing,
        useColumnFilter,
        // selectedRowIds: globalFilter !== prevGlobalFilter ? {} : selectedRowIds,
      };

      if (
        onChangePage instanceof Function &&
        (filters !== prevState.filters || globalFilter !== prevState.globalFilter)
      ) {
        onChangePage(1);
      }

      setInitialState(val);
      const newPageIndex =
        totalCount && Math.floor(totalCount / tablePageSize) < pageIndex
          ? Math.floor(totalCount / tablePageSize)
          : pageIndex;
      if (newPageIndex !== pageIndex) {
        setTimeout(() => {
          onChangePageInfoHanlder({
            pageSize: tablePageSize as number,
            pageIndex: newPageIndex,
          });
        });
      }
      return {
        ...newState,
        pageSize: tablePageSize,
        globalFilteredRows,
        pageIndex: newPageIndex,
      };
    },
    [
      dispatchEvent,
      idColumn,
      onChangePage,
      onChangePageInfoHanlder,
      onSelectionChange,
      selectionType,
      setInitialState,
      totalCount,
      useColumnFilter,
    ],
  );

  const instance = useTable<T>(
    {
      selectDisabled,
      ...props,
      getRowId,
      columns,
      // filterTypes,
      defaultColumn,
      // useControlledState,
      stateReducer,
      initialState: {
        ...initialState,
        hiddenColumns: initialState.hiddenColumns || hiddenColumns,
        selectedRowIds: selectedRowIds,
        pageIndex: pageNumber - 1,
        pageSize: initialState.pageSize || pageSize,
        pageQueryEnabled,
        ...(searchKeyword ? { globalFilter: searchKeyword } : {}),
      },
      globalFilter: (rows: Row<T>[], columns: IdType<T>[], filterValue: string) => {
        return globalFilterFunc<T>(rows, columns, filterValue);
      },
    },
    ...getHooks(useSelection, selectionType),
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    page,
    // totalcount 가 있으면 서버사이드 페이징이라고 인식하고 전체 rows로 출력한다.
    rows,
    prepareRow,
    setGlobalFilter,
    toggleAllRowsSelected,
    state: { filters, globalFilter = searchKeyword },
  } = instance;

  return (
    <>
      <WrapBox useWrap={useWrap} className={'table-div'}>
        {useToolbar ? (
          <TableToolbar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            useColumnFilter={useColumnFilter}
            setUseColumnFilter={setUseColumnFilter}
            instance={instance}
            isSearchStyle={isSearchStyle}
            useServerPaging={useServerPaging}
            {...{ onAdd, onDelete, onEdit, onRefresh, onSearchKeyword }}
            columnVisibleSettingExclude={columnVisibleSettingExclude}
          />
        ) : null}
        <div
          className={cx(
            'table-wrap',
            {
              'use-toolbar': useToolbar,
              'use-pagination': usePagination,
            },
            'table-wrap-global',
            isVirtualScroll && dataCount > 1000 ? 'virtual-div' : '',
          )}
        >
          <div className={classes.tableTable} {...getTableProps()} {...props.tableDivProps}>
            <div
              ref={headerContainer}
              className={cx(classes.tableHead, isVirtualScroll && dataCount > 1000 ? 'virtual-head' : '')}
            >
              {headerGroups.map((headerGroup, headerGroupIdx) => (
                <div
                  {...headerGroup.getHeaderGroupProps()}
                  className={cx(
                    classes.tableHeadRow,
                    'table-head-row',
                    headerGroups.length > 1 ? 'db-table-head-row' : '',
                  )}
                  key={headerGroupIdx}
                >
                  {headerGroup.headers.map((column, columnIdx) => {
                    const _column = column as HeaderGroup<T> & {
                      useColumnBorder?: boolean;
                    };
                    const style: any = {
                      textAlign: column.align ? column.align : 'left ',
                    };
                    const tableSortDivStyle = {
                      borderRight: _column.useColumnBorder ? '1px solid #dbdbdb' : 'none',
                    };
                    if (centerGroupColumn.length > -1) {
                      const columnId = column.id.substring(0, column.id.lastIndexOf('_'));
                      if (centerGroupColumn.indexOf(columnId) > -1) {
                        style.width = '100%';
                        style.textAlign = 'center';
                      }
                    }
                    const tempHeaderGroup: any = {
                      ...column.getHeaderProps(headerProps),
                    };
                    const parseProps = Object.keys(column.getHeaderProps(headerProps)).reduce(
                      (acc: any, propKey: string) => {
                        if (propKey !== 'style') {
                          acc[propKey] = tempHeaderGroup[propKey];
                        }
                        return acc;
                      },
                      {},
                    );
                    let headerStyle = tempHeaderGroup.style;
                    let isFixColumnBorder = false;
                    if (groupColumnStartIndex.length > -1 && groupColumnStartIndex.indexOf(column.id) > -1) {
                      if (columnIdx > 0) {
                        isFixColumnBorder = true;
                      }
                      headerStyle = {
                        ...headerStyle,
                        height: '60px',
                        marginTop: '-30px',
                      };
                    }

                    if (cellBackgroundColorColumn.length > -1 && cellBackgroundColorColumn.indexOf(column.id) > -1) {
                      headerStyle = {
                        ...headerStyle,
                        backgroundColor: '#f6f7f9',
                      };
                    }

                    return (
                      <div
                        {...parseProps}
                        style={headerStyle}
                        className={cx(
                          classes.tableHeadCell,
                          isFixColumnBorder ? 'fix-column-border' : '',
                          'table__head--cell',
                        )}
                        key={columnIdx}
                      >
                        {column.canSort ? (
                          <TableSortLabelWrap useColumnBorder={_column.useColumnBorder as boolean}>
                            <TableSortLabel
                              active={column.isSorted}
                              direction={column.isSortedDesc ? 'desc' : 'asc'}
                              {...column.getSortByToggleProps()}
                              style={style}
                            >
                              {column.render('Header')}
                            </TableSortLabel>
                          </TableSortLabelWrap>
                        ) : (
                          <TableLabel style={style} align={column.align as string}>
                            {column.render('Header')}
                          </TableLabel>
                        )}
                        {useColumnFilter && column.id !== '_selector' && column.canFilter && column.render('Filter')}
                        {column.canResize && <ResizeHandle column={column} />}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <TableBody {...getTableBodyProps()}>
              {(totalCount ? rows : page).length ? (
                (totalCount ? rows : page).map((row, pageIdx) => {
                  prepareRow(row);
                  const rowStatus = (row.original as any)['status'];
                  const statusClassName = isRowStatus ? getStatusClassName(rowStatus) : '';
                  const disabledRow = selectDisabled(row);
                  const makeStyles = cx(
                    classes.tableRow,
                    { rowSelected: row.isSelected },
                    statusClassName,
                    'table-row',
                  );
                  return (
                    <Fragment key={pageIdx}>
                      <div {...row.getRowProps()} className={makeStyles}>
                        {row.cells.map((cell, cellIdx) => {
                          const cellPropObj: any = cell.getCellProps(cellProps);
                          const disabledCell =
                            disabledRow && !excludeDisabledColumns.includes((cell.render('id') as string) || '');
                          const cellStyle: any = cellPropObj.style;
                          cellStyle.alignItems = 'baseline';
                          cellStyle.paddingTop = '10px';
                          cellStyle.paddingBottom = '10px';

                          return (
                            <div
                              {...cellPropObj}
                              onClick={(e) => {
                                if (disabledRow) {
                                  return;
                                }
                                cellClickHandler(cell, e);
                              }}
                              className={cx(
                                classes.tableCell,
                                {
                                  disabledCell,
                                },
                                'table-cell',
                              )}
                              key={cellIdx}
                            >
                              {cell.isGrouped ? (
                                <>
                                  <TableSortLabel
                                    classes={{
                                      iconDirectionAsc: classes.iconDirectionAsc,
                                      iconDirectionDesc: classes.iconDirectionDesc,
                                    }}
                                    active
                                    direction={row.isExpanded ? 'desc' : 'asc'}
                                    IconComponent={KeyboardArrowUp}
                                    {...row.getToggleRowExpandedProps()}
                                    className={classes.cellIcon}
                                  />
                                  {cell.render('Cell')} ({row.subRows.length})
                                </>
                              ) : cell.isAggregated ? (
                                cell.render('Aggregated')
                              ) : cell.isPlaceholder ? null : (
                                cell.render('Cell')
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {(row.isExpanded || allExpanded) && renderRowSubComponent instanceof Function && (
                        <div className={'sub-component'}>{renderRowSubComponent(row)}</div>
                      )}
                    </Fragment>
                  );
                })
              ) : (
                <div
                  className={cx(!isSmallTable ? styles['no-data'] : styles['small-table-no-data'], 'global-no-data')}
                >
                  {renderNoDataComponent()}
                </div>
              )}
            </TableBody>
          </div>
        </div>
        {usePagination ? (
          <TableNumberPagination
            instance={instance}
            pageQueryEnabled={pageQueryEnabled}
            isLeft={true}
            isSubRowStyle={isSubRowStyle}
            usePerPage={usePerPage}
            totalCount={totalCount}
            onChangePageInfo={onChangePageInoHanlder}
            onChangePage={onChangePageHanlder}
            useAll={useAll}
          />
        ) : null}
      </WrapBox>
      );
    </>
  );
}

export default Table;
