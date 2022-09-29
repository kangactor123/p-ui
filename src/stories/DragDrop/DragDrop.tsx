import React, { DragEvent, ReactElement, ReactNode, useCallback } from 'react';
import styled from '@emotion/styled';

export interface IDragDropProps {
  //Todo: define props
  children?: ReactNode;
  onDrop: (file: File) => void;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

function DragDrop({ children, onDrop }: IDragDropProps): ReactElement {
  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();

      if (!e.dataTransfer) return;

      let file;
      if (e.dataTransfer.items) {
        if (e.dataTransfer.items[0]?.kind === 'file') {
          file = e.dataTransfer.items[0].getAsFile();
        }
      } else {
        if (e.dataTransfer.files[0]) {
          file = e.dataTransfer.files[0];
        }
      }

      if (!file) return;

      onDrop(file);
    },
    [onDrop],
  );

  const dragOverHandler = useCallback((e: DragEvent): void => {
    e.preventDefault();
  }, []);

  return (
    <Wrapper onDrop={handleDrop} onDragOver={dragOverHandler}>
      {children}
    </Wrapper>
  );
}

export default DragDrop;
