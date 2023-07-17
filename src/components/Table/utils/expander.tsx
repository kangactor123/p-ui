import React from 'react';
import { Column, TableExpandedToggleProps } from 'react-table';
import { ArrowDownIcon, ArrowUpIcon } from '../../icons';

export function expander<T extends object>(): Column<T> {
  return {
    id: 'expander',
    disableResizing: true,
    disableGroupBy: true,
    minWidth: 60,
    width: 60,
    maxWidth: 60,
    Header: '',
    Cell: ({ row }: { row: any }) => {
      return (
        <span
          {...(row.getToggleRowExpandedProps() as TableExpandedToggleProps)}
          style={{ cursor: 'pointer', color: '#8995ae' }}
        >
          {row.isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </span>
      );
    },
  };
}
