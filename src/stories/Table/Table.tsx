import { TableSortLabel } from '@mui/material';
import React, {
  Fragment,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useRef,
  FunctionComponent,
  ChangeEvent,
  useMemo,
} from 'react';
import {
  ActionType,
  Cell,
  CellProps,
  HeaderGroup,
  HeaderProps,
  Hooks,
  Meta,
  Row,
  TableInstance,
  TableOptions,
  TableState,
  useColumnOrder,
  useExpanded,
  useFilters,
  useGlobalFilter,
  useFlexLayout,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
  IdType,
  Column,
} from 'react-table';

import { useLocalStorage } from './utils';
import { ResizeHandle } from './ResizeHandle';
import { HeaderCheckbox, RowCheckbox, RowRadio, tableStyles, subTableStyles, tableWrapStyles } from './Table.Style';
import { TableToolbar } from './TableToolbar';
import { TooltipCell } from './TooltipCell';
import { keyBy, mapValues } from 'lodash';

import { useTranslation } from 'react-i18next';
import { ALL_VALUE, TableNumberPagination } from './TableNumberPagination';
import ColumnFilter, { getGlobalFilteredRows, multiSelectFilter } from './ColumnFilter';
import { cx } from '@emotion/css';
import { css } from '@emotion/react';
import { debounce } from 'lodash';
import { regExp } from '../../common/helper';
import { IndeterminateIcon, KeyboardUpIcon } from './icons';

export const exceptFilterColumnIds = [
  '_selector',
  'selector_',
  'expander',
  'topology',
  'assessmentReport',
  'jobDetails',
  'assessmentData',
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ITable<TModel extends object> extends TableOptions<TModel> {
  name: string;
  idColumn?: string | null;
  selectedRows?: (number | string)[];
  renderRowSubComponent?: (row: Row<TModel>) => ReactNode;
  selectDisabled?: (row: Row<TModel>) => boolean; //row disabled
  excludeDisabledColumns?: string[]; //row disabled
  searchNoDataComponent?: React.ReactNode;
  noDataComponent?: React.ReactNode;
  isSmallTable?: boolean;
  onAdd?: (instance: TableInstance<TModel>) => MouseEventHandler;
  onDelete?: (instance: TableInstance<TModel>) => MouseEventHandler;
  onEdit?: (instance: TableInstance<TModel>) => MouseEventHandler;
  onClick?: (row: Row<TModel>, instance: TableInstance<TModel>) => void;
  onRefresh?: (e: any) => void;
  onSearchKeyword?: (e: any) => void;
  onChangePage?: (e: any) => void;
  onChangePageSize?: (e: any) => void;
  onChangePageInfo?: (e: any) => void;
  onSelectionChange?: (rowIds: any, instance: TableInstance<TModel>) => void;
  onChangeExpanded?: (expanded: any) => void;
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
  tableBodyDivProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
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
  columnVisibleSettingExclude?: string[];
  searchKeyword?: string | null;
  useAll?: boolean;
  expanded?: unknown;
  siblingCount?: number;
  useRowLine?: boolean; // row 간 라인이 필요할 경우 (pagination 사용을 하지 않아야 사용가능)
}

const defaultColumn = {
  Filter: ColumnFilter,
  filter: multiSelectFilter,
  Cell: TooltipCell,
  // Header: DefaultHeader,
  // When using the useFlexLayout:
  minWidth: 30, // minWidth is only used as a limit for resizing
  width: 100, // width is used for both the flex-basis and flex-grow
  // maxWidth: 200, // maxWidth is only used as a limit for resizing
};

const getStyles = (props: any, align = 'left', useBorder = false) => [
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

function TableCheckboxSelectHeader({
  getToggleAllPageRowsSelectedProps,
  page,
  selectDisabled,
}: HeaderProps<any> & { selectDisabled: (row: Row) => boolean }) {
  const { onChange, ...props } = getToggleAllPageRowsSelectedProps();

  const handleChange = useCallback(
    (event: ChangeEvent) => {
      if (onChange instanceof Function) {
        const disabledRows: Row[] = [];
        page.forEach((row) => {
          if (selectDisabled(row)) {
            disabledRows.push({
              ...row,
            });
          }
        });
        onChange(event);
        setTimeout(() => {
          disabledRows.forEach((row) => {
            row.toggleRowSelected(row.isSelected);
          });
        });
      }
    },
    [onChange, page, selectDisabled],
  );

  return (
    <HeaderCheckbox color="primary" onChange={handleChange} indeterminateIcon={<IndeterminateIcon />} {...props} />
  );
}

function TableCheckboxSelectCell({ row }: CellProps<any>) {
  return <RowCheckbox color="primary" {...row.getToggleRowSelectedProps()} />;
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

function TableRadioSelectCell(instance: any) {
  return (
    <RowRadio
      name="select-radio"
      checked={instance.row.isSelected}
      color="primary"
      disabled={instance.selectDisabled(instance.row)}
      onClick={toggleSelect(instance)}
      // checkedIcon={
      //   <span
      //     css={css`
      //       ${tableStyles.radioIcon}
      //       ${tableStyles.radioCheckedIcon}
      //     `}
      //   />
      // }
      // icon={<span css={tableStyles.radioIcon} />}
    />
  );
}

const selectionHooks = (type: 'checkbox' | 'radio', hooks: Hooks<any>) => {
  hooks.allColumns.push((columns) => [
    // Let's make a column for selection
    {
      id: type === 'checkbox' ? '_selector' : 'selector_',
      disableResizing: true,
      disableGroupBy: true,
      minWidth: 35,
      width: 35,
      maxWidth: 35,
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header:
        type === 'checkbox' ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (TableCheckboxSelectHeader as FunctionComponent<HeaderProps<any>>)
        ) : (
          <></>
        ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
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
const headerProps = <TModel extends object>(props: any, { column }: Meta<TModel, { column: HeaderGroup<TModel> }>) =>
  getStyles(props, column && column.align);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cellProps = <TModel extends object>(props: any, { cell }: Meta<TModel, { cell: Cell<TModel> }>) => {
  const column = cell.column as HeaderGroup<TModel> & { useColumnBorder?: boolean };
  return getStyles(props, column && column.align, column && column.useColumnBorder);
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
const hooksWithoutSelection = hooks.slice(0, -1);
const filterTypes = {};

function globalFilterFunc<TModel extends object>(
  rows: Row<TModel>[],
  columIds: IdType<TModel>[],
  filterValue: string,
): Row<TModel>[] {
  return rows.filter((row) => {
    return columIds.some((id) => {
      if (exceptFilterColumnIds.includes(id || '') || id?.endsWith('_isAction')) {
        return false;
      }
      const value = row.values[id];
      return regExp(filterValue, 'i').test(value);
    });
  });
}

/**
 * Table
 */
export function Table<TModel extends object>(props: PropsWithChildren<ITable<TModel>>): ReactElement {
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
    onChangeExpanded,
    selectDisabled = () => false,
    groupColumnStartIndex = [],
    centerGroupColumn = [],
    cellBackgroundColorColumn = [],
    totalCount = undefined,
    excludeDisabledColumns = [],
  } = props;
  const {
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
    isSubRowStyle = false,
    isSmallTable = false,
    isSelectionClearByFilterChange = true,
    isSearchStyle = true,
    useServerPaging = false,
    renderRowSubComponent,
    columnVisibleSettingExclude = [],
    searchKeyword = '',
    useAll = true,
    expanded = {},
    siblingCount = 1,
    useRowLine = false,
  } = props;

  const pageSize = !usePagination ? 999999 : pageSizeProp || 10;

  const { t }: { t: (key: string, options?: any) => string } = useTranslation();
  const [initialState, setInitialState] = useLocalStorage(`tableState:${name}`, {});

  const classes = isSubRowStyle === true ? subTableStyles : tableStyles;

  const [currentRow, setCurrentRow] = useState({});
  const [useColumnFilter, setUseColumnFilter] = useState(!!initialState.useColumnFilter);

  const headerContainer = useRef(null);

  const tireggerSelectionChange = useCallback(
    (ids: any[]) => {
      if (onSelectionChange instanceof Function) {
        onSelectionChange(ids, instance);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSelectionChange],
  );

  const onChangeExpandedHandler = useCallback(
    (newExpanded = {}) => {
      if (onChangeExpanded instanceof Function) {
        setTimeout(() => {
          onChangeExpanded(newExpanded);
        });
      }
    },
    [onChangeExpanded],
  );

  const dispatchEvent = debounce((selectedRowIdArray: any[]) => {
    tireggerSelectionChange(selectedRowIdArray);
  }, 200);

  const onChangePageInoHanlder = useCallback(
    (pageInfo: any) => {
      if (onChangePageInfo instanceof Function) {
        onChangePageInfo(pageInfo);
      }
    },
    [onChangePageInfo],
  );

  const stateReducer = useCallback(
    (
      newState: Omit<TableState<TModel>, 'pageSize'> & { pageSize: 'All' | number },
      _action: ActionType,
      prevState: TableState<TModel>,
      instance: any,
    ): TableState<TModel> & { globalFilteredRows: Row<TModel>[] } => {
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

      const { sortBy, filters, pageIndex, pageSize, hiddenColumns } = newState;
      const columnResizing = {
        ...newState.columnResizing,
        columnWidths: {
          ...(prevState.columnResizing?.columnWidths || {}),
          ...(newState.columnResizing?.columnWidths || {}),
        },
      };

      const tablePageSize: number = pageSize === 'All' ? ALL_VALUE : pageSize;
      const globalFilteredRows = globalFilter
        ? getGlobalFilteredRows<TModel>(initialRows, allColumns, globalFilter)
        : initialRows;
      const val = {
        sortBy,
        filters,
        globalFilter,
        pageSize: tablePageSize as number,
        hiddenColumns,
        columnResizing,
        useColumnFilter,
      };

      if (
        onChangePage instanceof Function &&
        (filters !== prevState.filters || globalFilter !== prevState.globalFilter)
      ) {
        onChangePage(1);
      }

      if (
        (prevState.expanded && Object.keys(prevState.expanded)) ||
        (newState.expanded && Object.keys(newState.expanded))
      ) {
        onChangeExpandedHandler(newState.expanded);
      }

      setInitialState(val);
      const newPageIndex =
        totalCount && Math.floor(totalCount / tablePageSize) < pageIndex
          ? Math.floor(totalCount / tablePageSize)
          : pageIndex;
      if (newPageIndex !== pageIndex) {
        setTimeout(() => {
          onChangePageInoHanlder({
            pageSize: tablePageSize as number,
            pageIndex: newPageIndex,
          });
        });
      }
      return {
        ...newState,
        columnResizing,
        pageSize: tablePageSize,
        globalFilteredRows,
        pageIndex: newPageIndex,
      };
    },
    [
      dispatchEvent,
      idColumn,
      onChangePage,
      onChangePageInoHanlder,
      onSelectionChange,
      selectionType,
      setInitialState,
      totalCount,
      useColumnFilter,
    ],
  );

  const getRowId = idColumn ? (row: any = {}) => row[idColumn] : undefined;

  const filteredSelectedRows: any[] = selectedRows?.filter((id) =>
    props.data.some((item: any) => (getRowId instanceof Function ? id === getRowId(item) : id === item.id)),
  );

  const selectedRowIds = selectedRows
    ? mapValues(
        keyBy(
          filteredSelectedRows.map((rowId) => ({ id: rowId })),
          'id',
        ),
        () => true,
      )
    : [];

  const instance = useTable<TModel>(
    {
      selectDisabled,
      ...props,
      getRowId,
      columns,
      filterTypes,
      defaultColumn: defaultColumn as Partial<Column<TModel>> | undefined,
      stateReducer,
      initialState: {
        ...initialState,
        hiddenColumns: initialState.hiddenColumns || hiddenColumns,
        selectedRowIds: selectedRowIds,
        pageIndex: pageNumber - 1,
        pageSize: initialState.pageSize || pageSize,
        pageQueryEnabled,
        expanded,
        ...(searchKeyword ? { globalFilter: searchKeyword } : {}),
      },
      globalFilter: (rows: Row<TModel>[], columns: IdType<TModel>[], filterValue: string) => {
        return globalFilterFunc<TModel>(rows, columns, filterValue);
      },
    },
    ...getHooks(useSelection, selectionType),
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    page,
    rows,
    prepareRow,
    setGlobalFilter,
    toggleAllRowsSelected,
    state: { filters, globalFilter = searchKeyword },
  } = instance;

  // const dataCount = useMemo(() => instance?.page?.length, [instance?.page]);

  const getPages = () => {
    return page;
  };

  useEffect(() => {
    // 컬럼 필터 체크
    if (isSelectionClearByFilterChange && toggleAllRowsSelected) {
      toggleAllRowsSelected(false);
      tireggerSelectionChange([]);
    }
  }, [filters]);

  useEffect(() => {
    // 검색 필터 체크
    if (isSelectionClearByFilterChange && toggleAllRowsSelected) {
      toggleAllRowsSelected(false);
      tireggerSelectionChange([]);
    }
  }, [globalFilter]);

  const renderNoDataComponent = () => {
    if (globalFilter) {
      return props.searchNoDataComponent ? props.searchNoDataComponent : searchNoDataComponent;
    } else {
      return props.noDataComponent ? props.noDataComponent : noDataComponent;
    }
  };

  const cellClickHandler = (cell: Cell<TModel>, event: any) => {
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
        currentIndex = getPages().findIndex((page) => page.id === (currentRow as any).id) || 0;
        targetIndex = getPages().findIndex((page) => page.id === tempCurrentRow.id) || 0;
        const startIndex = currentIndex > targetIndex ? targetIndex : currentIndex;
        const endIndex = currentIndex > targetIndex ? currentIndex : targetIndex;
        for (let i = startIndex; i < endIndex + 1; i++) {
          if (cell?.row?.isSelected) {
            getPages()[i].cells[0].row.toggleRowSelected(false);
          } else {
            if (!getPages()[i].cells[0].row.isSelected) getPages()[i].cells[0].row.toggleRowSelected(true);
          }
        }
      }
    }
  };

  const onChangePageHanlder = useCallback(
    (page: number) => {
      if (onChangePage instanceof Function) {
        onChangePage(page);
      }
    },
    [onChangePage],
  );

  const searchNoDataComponent = useMemo(
    () => <div style={{ color: '#8995ae' }}>{t('No results found. Please alter your search')}</div>,
    [t],
  );

  const noDataComponent = useMemo(() => <div>{t('You do not have any data.')}</div>, [t]);

  return (
    <div css={tableWrapStyles} className={cx(useWrap ? 'wrap' : 'noWrapBox')}>
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
        )}
      >
        <div css={classes.tableTable} {...getTableProps()} {...props.tableDivProps}>
          <div ref={headerContainer} css={classes.tableHead}>
            {headerGroups.map((headerGroup, headerGroupIdx) => (
              <div
                {...headerGroup.getHeaderGroupProps()}
                css={classes.tableHeadRow}
                className={cx('table-head-row', headerGroups.length > 1 ? 'db-table-head-row' : '')}
                key={headerGroupIdx}
              >
                {headerGroup.headers.map((column, columnIdx) => {
                  const newColumn = column as HeaderGroup<TModel> & { useColumnBorder?: boolean };
                  const style: any = {
                    textAlign: column.align ? column.align : 'left ',
                  };
                  const tableSortDivStyle = {
                    borderRight: newColumn.useColumnBorder ? '1px solid #dbdbdb' : 'none',
                  };
                  if (centerGroupColumn.length > -1) {
                    const columnId = column.id.substring(0, column.id.lastIndexOf('_'));
                    if (centerGroupColumn.indexOf(columnId) > -1) {
                      style.width = '100%';
                      style.textAlign = 'center';
                    }
                  }
                  const tempHeaderGroup: any = { ...column.getHeaderProps(headerProps) };
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
                      css={classes.tableHeadCell}
                      {...parseProps}
                      style={headerStyle}
                      className={cx(isFixColumnBorder ? 'fix-column-border' : '', 'table__head--cell')}
                      key={columnIdx}
                    >
                      {column.canSort ? (
                        <div style={tableSortDivStyle} css={classes.tableSortLabelWrap} className={'sort-labe-wrap'}>
                          <TableSortLabel
                            active={column.isSorted}
                            direction={column.isSortedDesc ? 'desc' : 'asc'}
                            {...column.getSortByToggleProps()}
                            css={classes.tableSortLabel}
                            className={cx('table-sort-label')}
                            style={style}
                          >
                            {column.render('Header')}
                          </TableSortLabel>
                        </div>
                      ) : (
                        <div style={style}>{column.render('Header')}</div>
                      )}
                      {useColumnFilter &&
                        !exceptFilterColumnIds.includes(column.id) &&
                        !/_isAction$/i.test(column.id) &&
                        column.canFilter &&
                        column.render('Filter')}
                      {column.canResize && <ResizeHandle column={column} />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div
            {...getTableBodyProps()}
            {...props.tableBodyDivProps}
            className={cx({ row_line_body: useRowLine })}
            css={classes.tableBody}
          >
            {(totalCount ? rows : page).length ? (
              (totalCount ? rows : page).map((row, pageIdx) => {
                prepareRow(row);
                const disabledRow = selectDisabled(row);
                const makeStyles = cx({ rowSelected: row.isSelected }, 'table-row', { rowLine: useRowLine });
                return (
                  <Fragment key={pageIdx}>
                    <div {...row.getRowProps()} css={classes.tableRow} className={makeStyles}>
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
                            css={classes.tableCell}
                            className={cx(
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
                                  css={css`
                                    ${classes.cellIcon}
                                    ${classes.iconDirection}
                                  `}
                                  classes={{
                                    iconDirectionAsc: 'icon-direction-asc',
                                    iconDirectionDesc: 'icon-direction-desc',
                                  }}
                                  active
                                  direction={row.isExpanded ? 'desc' : 'asc'}
                                  IconComponent={KeyboardUpIcon}
                                  {...row.getToggleRowExpandedProps()}
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
              <div className={cx(!isSmallTable ? 'no-data' : 'small-table-no-data', 'global-no-data')}>
                {renderNoDataComponent()}
              </div>
            )}
          </div>
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
          siblingCount={siblingCount}
        />
      ) : null}
    </div>
  );
}

export default Table;

function getHooks(useSelection: boolean, selectionType: 'checkbox' | 'radio') {
  return useSelection ? hooskWithSelection(selectionType) : hooksWithoutSelection;
}
