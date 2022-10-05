import React, { ChangeEvent, forwardRef, ReactElement, useCallback, useState } from 'react';
import { css } from '@emotion/react';
import DragDrop from '../DragDrop';
import filesize from 'filesize';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import {
  addFileBtn,
  closeIcon,
  disabledInput,
  DropZone,
  FileInfo,
  FileTitle,
  GuideText,
  iconButtonContainer,
  SelectedFile,
  TextArea,
} from './DragDropZone.style';
import Button from '../Button';

export interface IDragDropZoneProps {
  //Todo: define props
  isExistFile?: boolean;
  fileRef: any;
  handleSelectFile: (file: File) => void;
  dropHandler: (dropFile: File) => void;
  fileName?: string | null;
  fileSize?: string | number | null;
  handleFileRemove: () => void;
  guideText?: string;
}

function DragDropZone({
  isExistFile,
  fileRef,
  handleSelectFile,
  dropHandler,
  fileName,
  fileSize,
  handleFileRemove,
  guideText = '',
}: IDragDropZoneProps): ReactElement {
  const [fileInputKey, setFileInputKey] = useState<number>(0);

  const disableInput = css`
    display: none;
  `;

  const onDropHandler = useCallback(
    (dropFile: File) => {
      if (dropHandler instanceof Function) dropHandler(dropFile);
    },
    [dropHandler],
  );

  const onSelectFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e?.target?.files && e?.target?.files[0]) {
        if (handleSelectFile instanceof Function) handleSelectFile(e.target.files[0]);
      }
    },
    [handleSelectFile],
  );

  const openFinder = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, [fileRef]);

  const onFileRemove = useCallback(() => {
    setFileInputKey((val) => val + 1);
    if (handleFileRemove instanceof Function) handleFileRemove();
  }, [setFileInputKey, handleFileRemove]);

  return (
    <DragDrop onDrop={onDropHandler}>
      <DropZone>
        <input
          key={fileInputKey}
          type="file"
          id="input-file-upload"
          ref={fileRef}
          onChange={onSelectFile}
          css={disabledInput}
        />
        <TextArea>
          <div>Drag and drop file here</div>
          <div>or</div>
        </TextArea>
        <Button css={addFileBtn} variant={'contained'} onClick={openFinder} disabled={Boolean(isExistFile)}>
          Add File
        </Button>
      </DropZone>
      {isExistFile ? (
        <SelectedFile>
          <FileInfo>
            <FileTitle>{fileName}</FileTitle>
            <span>{filesize(Number(fileSize))}</span>
          </FileInfo>
          <IconButton onClick={onFileRemove} css={iconButtonContainer}>
            <CloseIcon fontSize="small" css={closeIcon} />
          </IconButton>
        </SelectedFile>
      ) : (
        <GuideText>{guideText}</GuideText>
      )}
    </DragDrop>
  );
}

export default forwardRef(DragDropZone);
