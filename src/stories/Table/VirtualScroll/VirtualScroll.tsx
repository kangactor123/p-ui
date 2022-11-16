import React, { ReactElement } from 'react';
import { AutoSizer, List, ListProps } from 'react-virtualized';

export type TVirtualScrollProps = Omit<ListProps, 'width' | 'height'>;

function VirtualScroll({
  rowCount,
  rowHeight,
  rowRenderer,
  overscanRowCount,
  deferredMeasurementCache,
}: TVirtualScrollProps): ReactElement {
  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          rowCount={rowCount}
          width={width}
          height={height}
          rowHeight={rowHeight}
          deferredMeasurementCache={deferredMeasurementCache}
          rowRenderer={rowRenderer}
          overscanRowCount={overscanRowCount}
        />
      )}
    </AutoSizer>
  );
}

export default VirtualScroll;
