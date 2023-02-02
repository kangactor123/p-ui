import React, { ReactElement, ReactNode, useCallback, useState } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { TableSortLabel } from '@mui/material';
import { KeyboardUpIcon } from '../icons';
import { TableSortByToggleProps } from 'react-table';

type THeaderSortLabelProps = {
  active: boolean;
  direction: 'asc' | 'desc';
  iconCss: SerializedStyles;
  children: ReactNode;
  tableSortByToggleProps: TableSortByToggleProps;
  className?: string;
};

export function HeaderSortLabel(props: THeaderSortLabelProps): ReactElement {
  const { className, active, direction, iconCss, tableSortByToggleProps, children } = props;
  const [isHover, setIsHover] = useState(false);

  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  const handleMouseHover = useCallback(() => {
    setIsHover(true);
  }, []);

  const icon = css`
    ${iconCss};
    min-width: 20px;
    min-height: 20px;
    opacity: ${isHover && !active ? '0.5' : active ? '1' : '0'};
  `;

  return (
    <TableSortLabel
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseHover}
      IconComponent={() => <KeyboardUpIcon css={icon} />}
      active={active}
      direction={direction}
      className={className}
      {...tableSortByToggleProps}
    >
      {children}
    </TableSortLabel>
  );
}
