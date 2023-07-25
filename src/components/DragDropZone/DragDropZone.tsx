import React, {
  ChangeEvent,
  forwardRef,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from 'react';
import DragDrop from '../DragDrop';
import filesize from 'filesize';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import {
  addFileBtn,
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
import { DeleteIcon } from '../icons';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

export interface IDragDropZoneProps {
  isExistFile?: boolean;
  fileRef: any;
  handleSelectFile: (file: File) => void;
  dropHandler: (dropFile: File) => void;
  handleFileRemove: () => void;
  fileName?: string | null;
  fileSize?: string | number | null;
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
  const { t } = useTranslation();
  const theme = useContext(PlayceThemeContext);

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
    <ThemeProvider theme={theme}>
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
          {isExistFile ? (
            <SelectedFile>
              <FileInfo>
                <FileTitle>{fileName}</FileTitle>
                <span>({filesize(Number(fileSize))})</span>
              </FileInfo>
              <IconButton onClick={onFileRemove} css={iconButtonContainer}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </SelectedFile>
          ) : (
            <>
              <TextArea>
                <div>{t('Drag and drop file here')}</div>
                <div>{t('or')}</div>
              </TextArea>
              <Button
                css={addFileBtn}
                variant={'text'}
                color={'primary'}
                size={'small'}
                onClick={openFinder}
                disabled={Boolean(isExistFile)}
              >
                {t('Add File')}
              </Button>
            </>
          )}
        </DropZone>
        <GuideText>{guideText}</GuideText>
      </DragDrop>
    </ThemeProvider>
  );
}

export default forwardRef(DragDropZone);
