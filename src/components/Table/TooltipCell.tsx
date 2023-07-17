/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from '@emotion/react';
import React, { CSSProperties } from 'react';
import { CellProps } from 'react-table';

export const TooltipCell: React.FC<CellProps<any>> = ({
  cell: { value },
  column: { align = 'left' },
}: CellProps<any>) => <Tooltip text={value} align={align} />;

interface ITooltip {
  text: string;
  tooltip?: string;
  align: string;
}

export const Tooltip = ({ text, tooltip = text, align }: ITooltip) => {
  return (
    <div
      css={css`
        overflow: hidden;
      `}
      style={{ textAlign: align } as CSSProperties}
    >
      <span title={tooltip}>{text}</span>
    </div>
  );
};
