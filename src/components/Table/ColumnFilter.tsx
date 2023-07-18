import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, Popover } from '@mui/material';
import { IconTableUploadClose, FilterIcon, IndeterminateIcon } from './icons';
import { Column, Row } from 'react-table';
import 'react-virtualized/styles.css';
import VirtualScroll from './VirtualScroll';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { exceptFilterColumnIds as exceptColumnIds } from './Table';
import { cx } from '@emotion/css';
import { css } from '@emotion/react';
import { filterStyle } from './Table.Style';
import { regExp } from '../../common/helper';
import InputText from './InputText';
import Checkbox from '../Checkbox';

const classes = css({
  position: 'absolute',
  right: 16,
  top: 17,
  padding: 0,
  width: 16,
  height: 16,
});

type TCheckboxOption = {
  label: string;
  value: string;
  checked: boolean;
};

type TMultiFilterValue = unknown[];

type TFilter = {
  id: string;
  value: TMultiFilterValue;
};

const cache = new CellMeasurerCache({
  fixedWidth: false,
  defaultHeight: 30,
});

export function multiSelectFilter<T extends object>(
  rows: Row<T>[],
  columnIds: string[],
  filterValue: TMultiFilterValue = [],
): Row<T>[] {
  if (!filterValue || !filterValue?.length) {
    return rows;
  }
  const result = rows.filter((row: Row<T>) => {
    return columnIds.some((columnId: string) => {
      if (exceptColumnIds.includes(columnId) || /_isAction$/i.test(columnId)) {
        return true;
      }
      const value = row.values[columnId];
      return filterValue.some((option) => value === option);
    });
  });
  return result;
}

export function getGlobalFilteredRows<T extends object>(
  rows: Row<T>[],
  allColumns: Column[],
  globalFilter: string,
): Row<T>[] {
  if (!globalFilter) {
    return rows;
  }

  return rows.filter((row: Row<T>, index) => {
    return allColumns.some(({ id, accessor }: Column) => {
      if (exceptColumnIds.includes(id || '') || /_isAction$/i.test(id || '')) {
        return false;
      }

      const value = row.values[id || ''];
      return regExp(globalFilter, 'i').test(value);
    });
  });
}

function ColumnFilter<T extends object>(props: any): ReactNode {
  const { t } = useTranslation();

  const {
    allColumns = [],
    column: { id, setFilter, filterValue = [], translation = false, filterSorting = true },
    state: { filters: initialFilters = [], globalFilteredRows },
    setAllFilters,
  } = props;

  const initialFilterValue: TMultiFilterValue = filterValue;
  const initialFilter: TMultiFilterValue = useMemo(() => {
    return [...initialFilterValue];
  }, [initialFilterValue]);

  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const filterValues = globalFilteredRows.reduce((values: unknown[], row: Row<T>) => {
    const value = row.values[id];
    if (!values.includes(value)) {
      values.push(value);
    }
    return values;
  }, []);

  const filterValueMapper = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (filters: any[]) => {
      const values = filters.map((value: any): TCheckboxOption => {
        return {
          label:
            typeof value !== 'number' && !value ? t('(empty)') : translation ? t(value) : value,
          // value에 번역이 안되서 추가.
          value: translation ? t(value) : value,
          checked:
            !initialFilter ||
            initialFilter.length === 0 ||
            initialFilter.some((option: any) => option === value),
        };
      });
      return filterSorting
        ? values.sort((a: TCheckboxOption, b: TCheckboxOption) => {
            if (typeof a.value === 'number' && typeof b.value === 'number') {
              return a.value - b.value;
            } else if (!a.label) {
              return 1;
            } else if (!b.label) {
              return -1;
            } else {
              return a.label.toString().localeCompare(b.label as string);
            }
          })
        : values;
    },
    [filterSorting, initialFilter, t, translation],
  );

  const initialOptions = filterValueMapper(filterValues);
  const initialFilteredOptions = [...initialOptions];

  const [options, setOptions] = useState<TCheckboxOption[]>(initialOptions);

  const [filteredOptions, setFilteredOptions] = useState<TCheckboxOption[]>([
    ...initialFilteredOptions,
  ]);

  const getPreFilteredRows = useCallback(() => {
    let complete = false;
    return initialFilters.reduce(
      (newRows: Row<T>[], initialFilter: any) => {
        if (id === initialFilter.id) {
          complete = true;
        }
        if (complete) {
          return newRows;
        }

        const column = allColumns.find((column: Column) => column.id === initialFilter.id);
        if (column) {
          const { id: currentId, canFilter, filter, filterValue } = column;
          return !canFilter || currentId === id
            ? newRows
            : filter(newRows, [currentId], filterValue);
        } else {
          return newRows;
        }
      },
      [...globalFilteredRows],
    );
  }, [initialFilters, globalFilteredRows, id, allColumns]);

  const setFilterValue = useCallback(
    (newFilteredOptions: TCheckboxOption[]) => {
      if (!options.some((option) => !option.checked)) {
        setAllFilters(initialFilters.filter((filter: TFilter) => filter.id !== id));
      } else {
        setFilter(
          newFilteredOptions
            .filter((option: TCheckboxOption) => option.checked)
            .map((option: TCheckboxOption) => option.value),
        );
      }
    },
    [id, initialFilters, options, setAllFilters, setFilter],
  );

  const applySearchChange = useCallback(
    (search: string) => {
      const preFilteredRows = getPreFilteredRows();
      const newFilteredOptions = options.filter(({ value }: TCheckboxOption) => {
        return preFilteredRows.some((row: Row<T>) => {
          const ret = row.values[id] === value;
          return ret;
        });
      });
      const newOptions = search.length
        ? newFilteredOptions.filter((option: TCheckboxOption) => {
            const ret = option.value?.toString()?.toLowerCase().includes(search.toLowerCase());
            option.checked = ret;
            return ret;
          })
        : newFilteredOptions.map((option: TCheckboxOption) => {
            option.checked = true;
            return option;
          });
      if (newOptions.length) {
        setFilterValue(newOptions);
        setFilteredOptions(newOptions);
      } else {
        setFilteredOptions(newOptions);
      }
    },
    [getPreFilteredRows, id, options, setFilterValue],
  );

  const handleChangeInput = (event: any) => {
    const {
      target: { value },
    } = event;

    setSearch(value);
    applySearchChange(value);
  };

  const handleDeleteSearch = (event: React.MouseEvent) => {
    setSearch('');
    applySearchChange('');
  };

  const handleChangeCheckbox = useCallback(
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { checked },
      } = event;

      filteredOptions[index].checked = checked;

      if (filteredOptions.some((option) => option.checked)) {
        setFilterValue([...filteredOptions]);
      } else {
        setFilteredOptions([...filteredOptions]);
      }
    },
    [filteredOptions, setFilterValue],
  );

  const handleChangeCheckboxAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    filteredOptions.map((option) => {
      option.checked = event?.currentTarget?.checked;
      return option;
    });
    if (event?.currentTarget?.checked) {
      setFilterValue([...filteredOptions]);
    } else {
      setFilteredOptions([...filteredOptions]);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    const filterValues = globalFilteredRows.reduce((values: any[], row: Row<T>) => {
      const value = row.values[id];
      if (!values.includes(value)) {
        values.push(value);
      }
      return values;
    }, []);

    const newOptions = filterValueMapper(filterValues);
    const newFilteredOptions = [...newOptions];
    setOptions(newOptions);
    setFilteredOptions([...newFilteredOptions]);
  }, [globalFilteredRows, t]);

  useEffect(() => {
    if (isOpen) {
      setSearch('');

      const currentFilter = initialFilters.find(
        (initialFilter: TFilter) => initialFilter.id === id,
      );
      const preFilteredRows = getPreFilteredRows();

      if (currentFilter) {
        setFilteredOptions(
          options
            .filter((option) =>
              preFilteredRows.some((row: Row<T>) => row.values[id] === option.value),
            )
            .map((option) => {
              option.checked = currentFilter.value.includes(option.value);
              return option;
            }),
        );
      } else {
        const temp = options
          .filter((option) =>
            globalFilteredRows.some((row: Row<T>) => row.values[id] === option.value),
          )
          .map((option) => {
            option.checked = true;
            return option;
          });
        setFilteredOptions(temp);
      }
    }
  }, [isOpen]);

  const rowRenderer = useCallback(
    ({ index, key, style, parent }: any) => {
      const { label, value, checked } = filteredOptions[index];
      return (
        <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
          <li key={index} className={'filter-item'} style={style}>
            <Checkbox
              checked={checked}
              label={label}
              value={value}
              onChange={handleChangeCheckbox(index)}
            />
          </li>
        </CellMeasurer>
      );
    },
    [filteredOptions, handleChangeCheckbox],
  );

  const filterId = `${id}-column-filter`;

  if (options.length === 0) {
    return '';
  }

  const checkedAll = !filteredOptions.some((option) => !option.checked);

  return (
    <>
      <IconButton aria-describedby={filterId} onClick={handleClick}>
        <FilterIcon />
      </IconButton>
      <Popover
        id={filterId}
        open={isOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onBackdropClick={handleClose}
        css={filterStyle}
      >
        <div className={'filter-popover'}>
          <div className={'search'}>
            <InputText
              className={'search-input'}
              onChange={handleChangeInput}
              variant="outlined"
              value={search}
              placeholder={t('Search')}
            />
            {search && (
              <IconButton
                css={classes}
                className={cx('filter-search-clear')}
                onClick={handleDeleteSearch}
              >
                <IconTableUploadClose />
              </IconButton>
            )}
          </div>
          <div className={'filter-item-all'}>
            <Checkbox
              checked={checkedAll}
              label={t('Select All')}
              value={''}
              onChange={handleChangeCheckboxAll}
              indeterminate={checkedAll}
              indeterminateIcon={<IndeterminateIcon />}
            />
          </div>
          <div className={'filter-split'}>&nbsp;</div>
          <ul className={'filter-items'}>
            <VirtualScroll
              rowRenderer={rowRenderer}
              rowCount={filteredOptions?.length}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              overscanRowCount={5}
            />
          </ul>
        </div>
      </Popover>
    </>
  );
}

export default ColumnFilter;
