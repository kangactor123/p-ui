import React, { ReactElement, ReactNode, useCallback, useMemo } from 'react';
import { ButtonProps, Dialog, DialogActions, DialogContent, DialogTitle, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { confirmTheme, rightButtons } from './Confirm.style';
import Button from '../../Button';

export interface IConfirmProps<T = unknown> {
  title?: ReactNode;
  open: boolean;
  isCloseIcon?: boolean;
  children?: ReactNode;
  isCancelButton?: boolean;
  cancelLabel?: string;
  isOkButton?: boolean;
  okLabel?: string;
  okProps?: ButtonProps;
  dialogActionLeftButtons?: ReactNode;
  dialogActionRightButtons?: ReactNode;
  onOk?: (data?: T) => void;
  onCancel: () => void;
  size?: 'large' | 'medium' | 'small';
  backgroundColor?: string;
}

function Confirm(props: IConfirmProps): ReactElement {
  const { t } = useTranslation();
  const {
    title = '',
    children,
    open,
    isCancelButton = true,
    cancelLabel = 'Cancel',
    isOkButton = true,
    okLabel = 'OK',
    dialogActionLeftButtons,
    dialogActionRightButtons,
    onOk,
    onCancel,
    size = 'small',
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

  const renderTitle = useMemo(() => (typeof title === 'string' ? t(title) : title), [t, title]);
  const renderContent = useMemo(() => (typeof children === 'string' ? t(children) : children), [t, children]);

  return (
    <ThemeProvider theme={confirmTheme(size, backgroundColor)}>
      <Dialog
        onClose={handleOnClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
      >
        <DialogTitle id="alert-dialog-title">{renderTitle}</DialogTitle>
        <DialogContent>
          <div id="alert-dialog-description">{renderContent}</div>
        </DialogContent>
        <DialogActions>
          <div>{dialogActionLeftButtons}</div>
          <div css={rightButtons}>
            {isCancelButton && (
              <Button onClick={handleCancel} color="primary" variant="text" size="small">
                {t(cancelLabel)}
              </Button>
            )}
            {dialogActionRightButtons}
            {isOkButton && (
              <Button onClick={handleOk} color="primary" autoFocus variant="contained" size="small" {...okProps}>
                {t(okLabel)}
              </Button>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default Confirm;
