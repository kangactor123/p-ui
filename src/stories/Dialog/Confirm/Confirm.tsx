import React, { ReactElement, ReactNode, useCallback } from 'react';
import {
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ThemeProvider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { confirmTheme, iconClose, rightButtons } from './Confirm.style';
import Button from '../../Button';
import { IconClosePopup } from '../../icons';

export interface IConfirmProps<T = unknown> {
  title?: string | ReactNode;
  open: boolean;
  isCloseIcon?: boolean;
  children?: ReactNode;
  isCancelButton?: boolean;
  cancelLabel?: ReactNode;
  isOkButton?: boolean;
  okLabel?: ReactNode;
  okProps?: ButtonProps;
  dialogActionLeftButtons?: ReactNode;
  dialogActionRightButtons?: ReactNode;
  onOk?: (data?: T) => void;
  onCancel: () => void;
  size?: 'large' | 'medium' | 'small';
  customWSize?: string;
  customHSize?: string;
  backgroundColor?: string;
}

function Confirm(props: IConfirmProps): ReactElement {
  const { t } = useTranslation();

  const {
    title = '',
    children,
    open,
    isCloseIcon,
    isCancelButton = true,
    cancelLabel = t('Cancel'),
    isOkButton = true,
    okLabel = t('OK'),
    dialogActionLeftButtons,
    dialogActionRightButtons,
    onOk,
    onCancel,
    size = 'small',
    customWSize,
    customHSize,
    backgroundColor = '#fff',
    okProps = {},
  } = props;

  const handleOk = useCallback(() => {
    if (onOk instanceof Function) {
      onOk();
    }
  }, [onOk]);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const handleOnClose = useCallback(
    (event: React.SyntheticEvent, reason: string) => {
      if (reason === 'backdropClick') {
        return false;
      }
      onCancel();
    },
    [onCancel],
  );

  return (
    <ThemeProvider theme={confirmTheme(size, customWSize, customHSize, backgroundColor)}>
      <Dialog
        onClose={handleOnClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
      >
        <DialogTitle id="alert-dialog-title">
          {title}
          {isCloseIcon && (
            <IconButton css={iconClose} onClick={handleCancel}>
              <IconClosePopup css={iconClose} />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
          <div id="alert-dialog-description">{children}</div>
        </DialogContent>
        <DialogActions>
          <div> {dialogActionLeftButtons}</div>
          <div css={rightButtons}>
            {isCancelButton && (
              <Button onClick={handleCancel} color="primary" variant="text" size="small">
                {cancelLabel}
              </Button>
            )}
            {dialogActionRightButtons}
            {isOkButton && (
              <Button onClick={handleOk} color="primary" autoFocus variant="contained" size="small" {...okProps}>
                {okLabel}
              </Button>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default Confirm;
