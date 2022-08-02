import { IconButton, Popover } from "@mui/material";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Column, Row } from "react-table";
import { IconTableFilterDefault } from "../../../common/icons";
import { exceptFilterColumnIds as exceptColumnIds } from "../Table";

// scss style import
// const cx = classNames.bind(styles);

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       position: "absolute",
//       right: 16,
//       top: 8,
//       padding: 0,
//       width: 16,
//       height: 16,
//     },
//   })
// );

type CheckboxOption = {
  label: string;
  value: string;
  checked: boolean;
};

type MultiFilterValue = any[];

type Filter = {
  id: string;
  value: MultiFilterValue;
};

// const cache = new CellMeasurerCache({
//   fixedWidth: false,
//   defaultHeight: 30,
// });

// export function multiSelectFilter<T extends object>(
//   rows: Row<T>[],
//   columnIds: string[],
//   filterValue: MultiFilterValue = []
// ): Row<T>[] {
//   if (!filterValue || !filterValue?.length) {
//     return rows;
//   }
//   const result = rows.filter((row: Row<T>) => {
//     return columnIds.some((columnId: string) => {
//       if (
//         exceptFilterColumnIds.includes(columnId) ||
//         columnId.endsWith("_isAction")
//       ) {
//         return true;
//       }
//       const value = row.values[columnId];
//       return filterValue.some((option) => value === option);
//     });
//   });
//   return result;
// }

export function getGlobalFilteredRows<T extends object>(
  rows: Row<T>[],
  allColumns: Column[],
  globalFilter: string
): Row<T>[] {
  if (!globalFilter) {
    return rows;
  }

  return rows.filter((row: Row<T>, index) => {
    return allColumns.some(({ id, accessor }: Column) => {
      if (exceptColumnIds.includes(id || "") || id?.endsWith("_isAction")) {
        return false;
      }

      const value = row.values[id || ""];
      return RegExp(globalFilter, "i").test(value);
    });
  });
}

function ColumnFilter<T extends object>(props: any): ReactNode {
  //   const { t } = useTranslation();

  // debug mode
  if (process.env.REACT_APP_DEBUG) {
    console.log("props of ColumnFilter: ", props);
  }

  //   const classes = useStyles();

  type Key = keyof T;

  const {
    allColumns = [],
    column: {
      id,
      setFilter,
      filterValue = [],
      translation = false,
      filterSorting = true,
    },
    state: { filters: initialFilters = [], globalFilteredRows },
    setAllFilters,
  } = props;

  const initialFilterValue: MultiFilterValue = filterValue;
  const initialFilter: MultiFilterValue = [...initialFilterValue];

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const filterValues = globalFilteredRows.reduce(
    (values: any[], row: Row<T>) => {
      const value = row.values[id];
      if (!values.includes(value)) {
        values.push(value);
      }
      return values;
    },
    []
  );

  const filterValueMapper = useCallback(
    (filters: any[]) => {
      const values = filters.map((value: any): CheckboxOption => {
        return {
          label:
            typeof value !== "number" && !value
              ? "(empty)"
              : translation
              ? value
              : value,
          // value에 번역이 안되서 추가.
          value: translation ? value : value,
          checked:
            !initialFilter ||
            initialFilter.length === 0 ||
            initialFilter.some((option: any) => option === value),
        };
      });
      return filterSorting
        ? values.sort((a: CheckboxOption, b: CheckboxOption) => {
            if (typeof a.value === "number" && typeof b.value === "number") {
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
    [filterSorting, initialFilter, translation]
  );

  const initialOptions = filterValueMapper(filterValues);
  const initialFilteredOptions = [...initialOptions];

  const [options, setOptions] = useState<CheckboxOption[]>(initialOptions);

  const [filteredOptions, setFilteredOptions] = useState<CheckboxOption[]>([
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

        const column = allColumns.find(
          (column: Column) => column.id === initialFilter.id
        );
        if (column) {
          const { id: currentId, canFilter, filter, filterValue } = column;
          return !canFilter || currentId === id
            ? newRows
            : filter(newRows, [currentId], filterValue);
        } else {
          return newRows;
        }
      },
      [...globalFilteredRows]
    );
  }, [initialFilters, globalFilteredRows, id, allColumns]);

  const setFilterValue = useCallback(
    (newFilteredOptions: any) => {
      if (!options.some((option) => !option.checked)) {
        setAllFilters(
          initialFilters.filter((filter: Filter) => filter.id !== id)
        );
      } else {
        setFilter(
          newFilteredOptions
            .filter((option: CheckboxOption) => option.checked)
            .map((option: CheckboxOption) => option.value)
        );
      }
    },
    [id, initialFilters, options, setAllFilters, setFilter]
  );

  const applySearchChange = useCallback(
    (search: any) => {
      const preFilteredRows = getPreFilteredRows();
      const newFilteredOptions = options.filter(({ value }: CheckboxOption) => {
        return preFilteredRows.some((row: Row<T>) => {
          const ret = row.values[id] === value;
          return ret;
        });
      });
      const newOptions = search.length
        ? newFilteredOptions.filter((option: CheckboxOption) => {
            const ret = option.value
              ?.toString()
              ?.toLowerCase()
              .includes(search.toLowerCase());
            option.checked = ret;
            return ret;
          })
        : newFilteredOptions.map((option: CheckboxOption) => {
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
    [getPreFilteredRows, id, options, setFilterValue]
  );

  const handleChangeInput = (event: any) => {
    const {
      target: { value },
    } = event;

    setSearch(value);
    applySearchChange(value);
  };

  const handleDeleteSearch = (event: React.MouseEvent) => {
    setSearch("");
    applySearchChange("");
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
    [filteredOptions, setFilterValue]
  );

  const handleChangeCheckboxAll = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    const filterValues = globalFilteredRows.reduce(
      (values: any[], row: Row<T>) => {
        const value = row.values[id];
        if (!values.includes(value)) {
          values.push(value);
        }
        return values;
      },
      []
    );

    const newOptions = filterValueMapper(filterValues);
    const newFilteredOptions = [...newOptions];
    setOptions(newOptions);
    setFilteredOptions([...newFilteredOptions]);
  }, [globalFilteredRows]);

  useEffect(() => {
    if (open) {
      setSearch("");

      const currentFilter = initialFilters.find(
        (initialFilter: Filter) => initialFilter.id === id
      );
      const preFilteredRows = getPreFilteredRows();

      if (currentFilter) {
        setFilteredOptions(
          options
            .filter((option) =>
              preFilteredRows.some(
                (row: Row<T>) => row.values[id] === option.value
              )
            )
            .map((option) => {
              option.checked = currentFilter.value.includes(option.value);
              return option;
            })
        );
      } else {
        const temp = options
          .filter((option) =>
            globalFilteredRows.some(
              (row: Row<T>) => row.values[id] === option.value
            )
          )
          .map((option) => {
            option.checked = true;
            return option;
          });
        setFilteredOptions(temp);
      }
    }
  }, [open]);

  //   const rowRenderer = useCallback(
  //     ({ index, key, style, parent }: any) => {
  //       const { label, value, checked } = filteredOptions[index];
  //       return (
  //         <CellMeasurer
  //           key={key}
  //           cache={cache}
  //           parent={parent}
  //           columnIndex={0}
  //           rowIndex={index}
  //         >
  //           <li key={index} className={styles["filter-item"]} style={style}>
  //             <Checkbox
  //               labelProps={{
  //                 className: styles["filter-label"],
  //                 title: label,
  //               }}
  //               checked={checked}
  //               label={label}
  //               value={value}
  //               className={styles["filter-checkbox"]}
  //               onChange={handleChangeCheckbox(index)}
  //             />
  //           </li>
  //         </CellMeasurer>
  //       );
  //     },
  //     [filteredOptions, handleChangeCheckbox]
  //   );

  const filterId = `${id}-column-filter`;

  if (options.length === 0) {
    return "";
  }

  const checkedAll = !filteredOptions.some((option) => !option.checked);
  const filtered = initialFilter.length;

  return (
    <>
      {/* <IconButton aria-describedby={filterId} onClick={handleClick}>
        <IconTableFilterDefault />
      </IconButton>
      <Popover
        id={filterId}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onBackdropClick={handleClose}
      >
        <div className={styles["filter-popover"]}>
          <div className={styles["search"]}>
            <InputText
              className={styles["search-input"]}
              onChange={handleChangeInput}
              variant="outlined"
              value={search}
              // fullWidth
              placeholder={t("Search")}
            />
            {search && (
              <IconButton
                className={cx(classes.root, styles["filter-search-clear"])}
                onClick={handleDeleteSearch}
              >
                <IconUploadClose />
              </IconButton>
            )}
          </div>
          <div className={styles["filter-item-all"]}>
            <Checkbox
              checked={checkedAll}
              label={t("Select All")}
              labelProps={{
                className: cx(styles["filter-all"], "filter-label"),
              }}
              value={""}
              // disabled={search.length > 0 && filteredOptions.length !== options.length}
              onChange={handleChangeCheckboxAll}
              className={styles["filter-checkbox"]}
            />
          </div>
          <div className={styles["filter-split"]}>&nbsp;</div>
          <ul className={styles["filter-items"]}>
            <VirtualScroll
              rowRenderer={rowRenderer}
              rowCount={filteredOptions?.length}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              overscanRowCount={5}
            />
          </ul>
        </div>
      </Popover> */}
    </>
  );
}

export default ColumnFilter;
