import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// import { useTranslation } from 'react-i18next';
import { Dialog, iconCancel } from './DownloadFileProgress.style';
import { DialogContent, DialogTitle, IconButton } from '@mui/material';
import useConfirm from '../hooks/useConfirm';
import { DeleteIcon, CloseSmallIcon, FilesIcon, SuccessIcon, ErrorIcon, DeleteRedIcon } from '../../icons';
import Progressbar from '../../Progressbar';
import { cx } from '@emotion/css';
import SearchTooltip from '../../SearchTooltip';

export enum Status {
  PENDING = 'pending',
  INPROGRESS = 'in-progress',
  COMPLETED = 'Completed',
  CANCEL = 'Cancel',
  FAILED = 'Failed',
}

export interface IDownloadProgressInfo {
  percentage: number;
  loaded: number;
  status: Status;
}

export interface IDownloadFileProgressProps {
  //Todo: define props
  progressInfo: IDownloadProgressInfo;
  fileName: string;
  isOpened: boolean;
  onCancel: () => void;
  errorMessage: string;
}

export const byteToKB = (bytes: number): string => {
  return `${bytes / 1000} KB`;
};

const failedCondition = [Status.FAILED, Status.CANCEL];

function DownloadFileProgress({
  progressInfo,
  fileName,
  isOpened,
  onCancel,
  errorMessage,
}: IDownloadFileProgressProps): ReactElement {
  const { t } = useTranslation();

  const { percentage, loaded, status } = progressInfo;

  const splitFileName = fileName.split('.');
  const extension = splitFileName.slice(-1).join();
  const newFileName = splitFileName.slice(0, -1).join();

  const cancelConfirmDialog = useConfirm({
    title: t('Cancel Download'),
    children: t('Are you sure you want to cancel the download?'),
    okLabel: t('Cancel'),
    cancelLabel: t('Continue'),
    onOk: onCancel,
  });

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      cancelConfirmDialog.open();
    },
    [cancelConfirmDialog],
  );

  const dialogTitle = useMemo(
    () =>
      status === Status.COMPLETED || status === Status.FAILED || status === Status.CANCEL
        ? t(`Download ${status}`)
        : status === Status.PENDING
        ? t('Preparing Download')
        : t('Download File'),
    [status, t],
  );

  const statusIcon = useMemo(
    () =>
      status === Status.COMPLETED ? (
        <SuccessIcon />
      ) : status === Status.FAILED ? (
        <div className="icon-fail-wrap">
          <ErrorIcon />
          <SearchTooltip tooltip={errorMessage} />
        </div>
      ) : status === Status.CANCEL ? (
        <DeleteRedIcon />
      ) : (
        <IconButton onClick={handleCancel} css={iconCancel}>
          <DeleteIcon />
        </IconButton>
      ),
    [errorMessage, handleCancel, status],
  );

  const progressColor = useMemo(
    () => (failedCondition.includes(status) ? 'rgba(50, 35, 56, 0.38)' : '#A0D7FB'),
    [status],
  );

  return (
    <>
      <Dialog
        open={isOpened}
        disableEnforceFocus
        hideBackdrop={true}
        style={{ pointerEvents: 'none' }}
        PaperProps={{ className: 'download-progress' }}
      >
        <DialogTitle>
          {dialogTitle}
          <IconButton css={iconCancel} onClick={handleCancel}>
            <CloseSmallIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {status === Status.PENDING ? (
            <div className="file-info">
              <div className="file-title-wrap">
                <FilesIcon />
                <div className="file-name-wrap">{extension === 'zip' ? t('Zipping files') : t('Preparing File')}</div>
              </div>
            </div>
          ) : (
            <>
              <div className="file-info">
                <div className="file-title-wrap">
                  <FilesIcon />
                  <div className="file-name-wrap">
                    <div className={'file-name'}>{newFileName}</div>
                    <span>.{extension}</span>
                  </div>
                </div>
                <span className="file-size"> {byteToKB(loaded)}</span>
              </div>
              <div className="file-progress">
                <div className={cx('percentage', failedCondition.includes(status) && 'percentage_failed')}>
                  {percentage}%
                </div>
                <div className="progress-bar-wrap">
                  <Progressbar value={percentage} backgroundColor="#E6E9EF" progressColor={progressColor} />
                </div>
                {statusIcon}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      {cancelConfirmDialog.rendered}
    </>
  );
}

export default DownloadFileProgress;
