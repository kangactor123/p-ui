import React, { ReactNode, useCallback, useState } from 'react';
import Confirm, { IConfirmProps } from '../Confirm';

export interface IUseAlertProps extends Omit<IConfirmProps, 'open' | 'onCancel' | 'onOk'> {
  defaultOpened?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
}

export default function useConfirm({ onCancel, defaultOpened = false, ...props }: IUseAlertProps) {
  const [isOpened, setBeOpened] = useState<boolean>(defaultOpened);
  const [alertProps, setAlertProps] = useState(props);

  const open = useCallback(
    (children?: ReactNode, title?: ReactNode) => {
      if (children) {
        setAlertProps((prev) => ({
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

  const rendered = (
    <Confirm
      open={isOpened}
      onCancel={close}
      onOk={close}
      isCancelButton={false}
      okProps={{ color: 'secondary' }}
      {...alertProps}
    />
  );

  return { rendered, open, close };
}
