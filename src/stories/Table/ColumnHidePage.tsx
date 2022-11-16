/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement, useCallback } from 'react';
import { TableInstance } from 'react-table';
import ColumnVisibleSetting, { IColumn } from './ColumnVisibleSetting';

type TColumnHidePageProps<TModel extends object> = {
  instance: TableInstance<TModel> & { hiddenColumns?: string[] };
  exclude?: string[];
};

export function ColumnHidePage<TModel extends object>({
  instance,
  exclude = [],
}: TColumnHidePageProps<TModel>): ReactElement | null {
  const { allColumns, hiddenColumns = [], setHiddenColumns } = instance;
  const hideableColumns = allColumns.filter(
    (column) =>
      !exclude.concat(['_selector', 'selector_', 'expander']).includes(column.id) &&
      !!column.Header,
  );

  const visibleColumns = hideableColumns
    .filter((column) => column.isVisible)
    .map((column) => column.id);
  const defaultColumns = hideableColumns
    .filter((column) => !hiddenColumns.includes(column.id))
    .map((column) => column.id);

  const columns: IColumn[] =
    hideableColumns.map(
      (column) =>
        ({
          id: column.id,
          dt: column.Header,
        } as IColumn),
    ) || [];

  const onSave = useCallback(
    (visibles: string[]) => {
      const hideColumn = hideableColumns
        .filter((column) => !visibles.includes(column.id))
        .map((column) => column.id);
      setHiddenColumns(hideColumn);
    },
    [hideableColumns, setHiddenColumns],
  );
  return hideableColumns.length > 1 ? (
    <ColumnVisibleSetting
      columns={columns}
      defaultColumns={defaultColumns}
      visibleColumns={visibleColumns}
      onSave={onSave}
      isTableStyle
    />
  ) : null;
}
