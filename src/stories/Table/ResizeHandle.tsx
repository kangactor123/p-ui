import React from 'react';
import { ColumnInstance } from 'react-table';
import { cx } from '@emotion/css';
import { tableStyles } from './Table.Style';

export const ResizeHandle = <TModel extends {}>({ column }: { column: ColumnInstance<TModel> }) => {
  return (
    <div
      {...column.getResizerProps()}
      style={{ cursor: 'col-resize' }}
      css={tableStyles.resizeHandle}
      className={cx({ handleActive: column.isResizing })}
    />
  );
};
