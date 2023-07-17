import React, { useCallback, useRef, useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryDragDropZone, { IDragDropZoneProps } from './DragDropZone';

export default {
  title: 'Component/DragDropZone',
  component: StoryDragDropZone,
} as ComponentMeta<typeof StoryDragDropZone>;

const DragDropZone: Story<IDragDropZoneProps> = (args) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isExistFile, setIsExistFile] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | number | null>(null);

  const setFile = useCallback((file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setIsExistFile(true);
  }, []);

  const dropHandler = useCallback(
    (dropFile: File) => {
      if (isExistFile) return;
      setFile(dropFile);
    },
    [setFile, isExistFile],
  );

  const onSelectFile = useCallback(
    (file: File) => {
      setFile(file);
    },
    [setFile],
  );

  const handleFileRemove = useCallback(() => {
    if (setIsExistFile) setIsExistFile(false);
  }, [setIsExistFile]);

  return (
    <StoryDragDropZone
      {...args}
      fileRef={fileRef}
      isExistFile={isExistFile}
      handleSelectFile={onSelectFile}
      dropHandler={dropHandler}
      fileName={fileName}
      fileSize={fileSize}
      handleFileRemove={handleFileRemove}
    />
  );
};

export const Basic = DragDropZone.bind({});

Basic.args = {
  guideText: 'Only one file in jar, war, ear, zip file type is allowed.',
};
