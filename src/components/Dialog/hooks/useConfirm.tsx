import React, { ReactNode, useCallback, useState } from 'react';
import Confirm, { IConfirmProps } from '../Confirm';

export interface IUseConfirmProps extends Omit<IConfirmProps, 'open' | 'onCancel' | 'onOk'> {
  defaultOpened?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  closeOnOk?: boolean;
}

export default function useConfirm({
  onOk,
  onCancel,
  isCloseIcon,
  defaultOpened = false,
  closeOnOk = true,
  ...props
}: IUseConfirmProps) {
  const [isOpened, setBeOpened] = useState<boolean>(defaultOpened);
  const [confirmProps, setConfirmProps] = useState(props);

  const open = useCallback(
    (children?: ReactNode, title?: ReactNode) => {
      if (children) {
        setConfirmProps((prev) => ({
          ...prev,
          title: title ?? prev.title,
          children,
        }));
      }
      setBeOpened(true);
    },
    [setBeOpened],
  );

  const close = useCallback(() => {
    if (onCancel) onCancel();
    setBeOpened(false);
  }, [onCancel, setBeOpened]);

  const handleOk = useCallback(() => {
    if (onOk) onOk();
    if (closeOnOk) setBeOpened(false);
  }, [onOk, setBeOpened, closeOnOk]);

  const rendered = (
    <Confirm open={isOpened} isCloseIcon={isCloseIcon} onCancel={close} onOk={handleOk} {...confirmProps} />
  );

  return { rendered, open, close };
}
