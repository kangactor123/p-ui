import { css, cx } from '@emotion/css';
import { KeyboardArrowUp } from '@mui/icons-material';
import { debounce, keyBy, mapValues } from 'lodash';
import React, {
  Fragment,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  ActionType,
  Cell,
  CellProps,
  HeaderGroup,
  HeaderProps,
  Hooks,
  IdType,
  Meta,
  Row,
  TableInstance,
  TableOptions,
  TableState,
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import ColumnFilter, { getGlobalFilteredRows } from './Filter/ColumnFilter';
import { ALL_VALUE, TableNumberPagination } from './Pagination/TableNumberPagination';
import { ResizeHandle } from './ResizeHandle';
import {
  HeaderCheckbox,
  NoDataDiv,
  RowCheckbox,
  RowRadio,
  TableBody,
  TableHeadCell,
  TableHeadRow,
  TableLabel,
  TableSortLabel,
  TableSortLabelWrap,
  WrapBox,
} from './style/table.style';
import { TableToolbar } from './Toolbar/TableToolbar';
import { useLocalStorage } from './utils';
import { regExp } from './utils/util';
import { Translation } from '../../common/type';

export interface ITable<T extends object = {}> extends TableOptions<T> {
  name: string;
  idColumn?: string | null;
  selectedRows?: (number | string)[];
  renderRowSubComponent?: (row: Row<T>) => ReactNode;
  selectDisabled?: (row: Row<T>) => boolean;
  excludeDisabledColumns?: string[];
  searchNoDataComponent?: React.ReactNode;
  noDataComponent?: React.ReactNode;
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
  isSmallTable?: boolean;
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
  rowHeight?: number;
  columnVisibleSettingExclude?: string[];
  searchKeyword?: string | null;
  useAll?: boolean;
  t: (key: string, options?: any) => string;
}

function toggleSelect(instance: any) {
  return (event: any) => {
    if (!instance.state.selectedRowIds[instance.getRowId(instance.row.original)]) {
      instance.toggleAllRowsSelected(false);
      instance.row.toggleRowSelected(true);
    } else {
      event.preventDefault();
    }
  };
}

function TableCheckboxSelectHeader({ getToggleAllPageRowsSelectedProps, page }: HeaderProps<any>) {
  const { onChange, ...props } = getToggleAllPageRowsSelectedProps();

  const handleChange = useCallback(
    (event: any) => {
      if (onChange instanceof Function) {
        const disabledRows: Row[] = [];
        page.forEach((row) => {
          disabledRows.push({
            ...row,
          });
        });
        onChange(event);
        setTimeout(() => {
          disabledRows.forEach((row) => {
            row.toggleRowSelected(row.isSelected);
          });
        });
      }
    },
    [onChange, page],
  );

  return <HeaderCheckbox color="primary" onChange={handleChange} {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TableCheckboxSelectCell({ row }: CellProps<any>) {
  return <RowCheckbox color="primary" {...row.getToggleRowSelectedProps()} />;
}

function TableRadioSelectCell(instance: any, ...rest: any[]) {
  return (
    <RowRadio
      name="select-radio"
      checked={instance.row.isSelected}
      color="primary"
      disabled={instance.selectDisabled(instance.row)}
      onClick={toggleSelect(instance)}
      checkedIcon={<span className={cx(['radioIcon', 'radioCheckedIcon'])} />}
      icon={<span className={'radioIcon'} />}
    />
  );
}

const selectionHooks = (type: 'checkbox' | 'radio', hooks: Hooks<any>) => {
  hooks.allColumns.push((columns) => [
    {
      id: type === 'checkbox' ? '_selector' : 'selector_',
      disableResizing: true,
      disableGroupBy: true,
      minWidth: 35,
      width: 35,
      maxWidth: 35,
      Header: type === 'checkbox' ? TableCheckboxSelectHeader : <></>,
      Cell: type === 'checkbox' ? TableCheckboxSelectCell : TableRadioSelectCell,
    },
    ...columns,
  ]);
  hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
    // fix the parent group of the selection button to not be resizable
    const selectionGroupHeader = headerGroups[0].headers[0];
    selectionGroupHeader.canResize = false;
  });
};

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
const headerProps = <T extends object>(props: any, { column }: Meta<T, { column: HeaderGroup<T> }>) =>
  getStyles(props, column && column.disableResizing, column && column.align);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cellProps = <T extends object>(props: any, { cell }: Meta<T, { cell: Cell<T> }>) => {
  const column = cell.column as HeaderGroup<T> & { useColumnBorder?: boolean };
  return getStyles(props, column && column.disableResizing, column && column.align, column && column.useColumnBorder);
};

const hooks = [
  useColumnOrder,
  useFilters,
  useGlobalFilter,
  useGroupBy,
  useSortBy,
  useExpanded,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useRowSelect,
];

const hooskWithSelection = (type: 'checkbox' | 'radio') => [
  ...hooks,
  (hooks: Hooks<any>) => selectionHooks(type, hooks),
];

function getHooks(useSelection: boolean, selectionType: 'checkbox' | 'radio') {
  return useSelection ? hooskWithSelection(selectionType) : hooks.slice(0, -1);
}

function globalFilterFunc<T extends object>(
  rows: Row<T>[],
  columIds: string[],
  filterValue: string,
  // t: (value: string) => string,
): Row<T>[] {
  return rows.filter((row, index) => {
    return columIds.some((id) => {
      if (exceptFilterColumnIds.includes(id || '') || id?.endsWith('_isAction')) {
        return false;
      }
      const _value = row.values[id];
      const message = _value?.props?.message;
      const value = message ? message : _value;

      return regExp(filterValue, 'i').test(value);
    });
  });
}

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

const searchNoDataComponent = (t: Translation) => (
  <div style={{ color: '#8995ae' }}>{t('No results found. Please alter your search')}</div>
);

const noDataComponent = (t: Translation) => {
  if (t instanceof Function) {
    return <div>{t('You do not have any data')}</div>;
  } else {
    return <></>;
  }
};

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
    renderRowSubComponent,
    columnVisibleSettingExclude = [],
    searchKeyword = '',
    useAll = true,
    t,
  } = props;

  const [initialState, setInitialState] = useLocalStorage(`tableState:${name}`, {});
  const [useColumnFilter, setUseColumnFilter] = useState(!!initialState.useColumnFilter);
  const [currentRow, setCurrentRow] = useState({});
  const headerContainer = useRef(null);

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
      defaultColumn,
      stateReducer,
      initialState: {
        ...initialState,
        hiddenColumns: initialState.hiddenColumns || hiddenColumns,
        selectedRowIds: selectedRowIds,
        pageIndex: pageNumber - 1,
        pageSize: initialState.pageSize || pageSizeProp,
        pageQueryEnabled,
        ...(searchKeyword ? { globalFilter: searchKeyword } : {}),
      },
      globalFilter: (rows: Row<T>[], columns: IdType<T>[], filterValue: string) => {
        return globalFilterFunc<T>(rows, columns, filterValue);
      },
    },
    ...getHooks(useSelection, selectionType),
  );

  const renderNoDataComponent = () => {
    if (globalFilter) {
      return props.searchNoDataComponent ? props.searchNoDataComponent : searchNoDataComponent(t);
    } else {
      return props.noDataComponent ? props.noDataComponent : noDataComponent(t);
    }
  };

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    page,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter = searchKeyword },
  } = instance;

  const cellClickHandler = (cell: Cell<T>, event: any) => {
    if (
      useSelection &&
      cell.column.id !== '_selector' &&
      cell.column.id !== 'selector_' &&
      cell.column.id !== 'expander' &&
      !cell.column.id.endsWith('_isAction')
    ) {
      if (!selectDisabled(cell.row)) {
        if (selectionType === 'radio' && !cell.row.isSelected) {
          instance.toggleAllRowsSelected(false);
          cell.row.toggleRowSelected(!cell.row.isSelected);
        }
        if (selectionType === 'checkbox') {
          cell.row.toggleRowSelected(!cell.row.isSelected);
        }
      }
      onClick && onClick(cell.row, instance);
    } else {
      const tempCurrentRow = cell.row;
      setCurrentRow({ ...tempCurrentRow });
      if (event.shiftKey && cell.column.id === '_selector') {
        if (!(currentRow as any).id) {
          return;
        }
        let currentIndex = 0;
        let targetIndex = 0;
        currentIndex = page.findIndex((page) => page.id === (currentRow as any).id) || 0;
        targetIndex = page.findIndex((page) => page.id === tempCurrentRow.id) || 0;
        const startIndex = currentIndex > targetIndex ? targetIndex : currentIndex;
        const endIndex = currentIndex > targetIndex ? currentIndex : targetIndex;
        for (let i = startIndex; i < endIndex + 1; i++) {
          if (cell?.row?.isSelected) {
            page[i].cells[0].row.toggleRowSelected(false);
          } else {
            if (!page[i].cells[0].row.isSelected) page[i].cells[0].row.toggleRowSelected(true);
          }
        }
      }
    }
  };

  return (
    <>
      <WrapBox useWrap={useWrap} className={'table-div'}>
        {useToolbar ? (
          <TableToolbar
            downloadCSV={() => {}}
            t={(key: string) => ''}
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
        <div className={useToolbar || usePagination ? 'use-toolbar' : ''}>
          <div className={'tableTable'} {...getTableProps()} {...props.tableDivProps}>
            <div ref={headerContainer} className={'tableHead'}>
              {headerGroups.map((headerGroup, headerGroupIdx) => (
                <TableHeadRow
                  {...headerGroup.getHeaderGroupProps()}
                  className={headerGroups.length > 1 ? 'db-table-head-row' : ''}
                  key={headerGroupIdx}
                >
                  {headerGroup.headers.map((column, columnIdx) => {
                    const _column = column as HeaderGroup<T> & {
                      useColumnBorder?: boolean;
                    };
                    const style: any = {
                      textAlign: column.align ? column.align : 'left ',
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
                      <TableHeadCell
                        {...parseProps}
                        style={headerStyle}
                        // css={
                        //   isFixColumnBorder &&
                        //   css`
                        //     position: relative;
                        //     &::after {
                        //       content: '';
                        //       position: absolute;
                        //       top: 50%;
                        //       right: 0;
                        //       transform: translateY(-50%);
                        //       width: 1px;
                        //       height: 80%;
                        //       background: #ced5df;
                        //     }
                        //   `
                        // }
                        className={'table__head--cell'}
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
                      </TableHeadCell>
                    );
                  })}
                </TableHeadRow>
              ))}
            </div>
            <TableBody {...getTableBodyProps()}>
              {(totalCount ? rows : page)?.length ? (
                (totalCount ? rows : page)?.map((row, pageIdx) => {
                  prepareRow(row);
                  // const rowStatus = (row.original as any)['status'];
                  // const statusClassName = isRowStatus ? getStatusClassName(rowStatus) : '';
                  const disabledRow = selectDisabled(row);
                  // const makeStyles = cx(classes.tableRow, { rowSelected: row.isSelected }, statusClassName);
                  return (
                    <Fragment key={pageIdx}>
                      <div {...row.getRowProps()} className={'tableRow'}>
                        {row.cells.map((cell, cellIdx) => {
                          const cellPropObj: any = cell.getCellProps(cellProps);
                          const disabledCell =
                            disabledRow && !excludeDisabledColumns.includes((cell.render('id') as string) || '');
                          // const cellStyle: any = cellPropObj.style;
                          // cellStyle.alignItems = 'baseline';
                          // cellStyle.paddingTop = '10px';
                          // cellStyle.paddingBottom = '10px';

                          return (
                            <div
                              {...cellPropObj}
                              onClick={(e) => {
                                if (disabledRow) {
                                  return;
                                }
                                cellClickHandler(cell, e);
                              }}
                              className={'tableCell'}
                              key={cellIdx}
                            >
                              {cell.isGrouped ? (
                                <>
                                  <TableSortLabel
                                    classes={
                                      row.isExpanded
                                        ? { iconDirectionDesc: 'tranform: rotate(180deg)' }
                                        : { iconDirectionAsc: 'transform: rotate(90deg)' }
                                    }
                                    active
                                    direction={row.isExpanded ? 'desc' : 'asc'}
                                    IconComponent={KeyboardArrowUp}
                                    {...row.getToggleRowExpandedProps()}
                                    className={'cellIcon'}
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
                <NoDataDiv className={cx(!isSmallTable ? 'no-data' : 'small-table-no-data')}>
                  {renderNoDataComponent()}
                </NoDataDiv>
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
            onChangePageInfo={onChangePageInfoHanlder}
            onChangePage={onChangePageHandler}
            useAll={useAll}
          />
        ) : null}
      </WrapBox>
    </>
  );
}

export default Table;
