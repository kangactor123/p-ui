/* eslint-disable @typescript-eslint/ban-types */
// import cx from 'classnames';
import React from 'react';
import { ColumnInstance } from 'react-table';
import { useStyles } from './style/MuiTableStyles';

export const ResizeHandle = <T extends {}>({ column }: { column: ColumnInstance<T> }) => {
  return (
    <div
      {...column.getResizerProps()}
      style={{ cursor: 'col-resize' }} // override the useResizeColumns default
      // className={cx({
      //   [classes.resizeHandle]: true,
      //   handleActive: column.isResizing,
      // })}
    />
  );
};
