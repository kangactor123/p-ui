import styled from '@emotion/styled';
import React, { ReactElement, ReactNode, useCallback } from 'react';

export interface IDndFileProps {
  onDrop: (file: File) => void;
  children: ReactNode;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

function DndFile({ onDrop: onDropProp, children }: IDndFileProps): ReactElement {
  const onDrop = useCallback(
    (e: DragEvent): void => {
      // Note: See https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
      e.preventDefault();

      // No file...
      if (!e.dataTransfer) return;

      let file;
      if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        if (e.dataTransfer.items[0]?.kind === 'file') {
          // If dropped items aren't files, reject them
          file = e.dataTransfer.items[0].getAsFile();
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        if (e.dataTransfer.files[0]) {
          file = e.dataTransfer.files[0];
        }
      }

      // No file...
      if (!file) return;
      onDropProp(file);
    },
    [onDropProp],
  );

  return (
    <Wrapper onDrop={onDrop} onDragOver={dragOverHandler}>
      {children}
    </Wrapper>
  );
}
function dragOverHandler(ev: DragEvent) {
  ev.preventDefault();
}

export default DndFile;
