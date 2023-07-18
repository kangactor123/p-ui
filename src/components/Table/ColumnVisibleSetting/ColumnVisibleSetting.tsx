/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  ChangeEvent,
  forwardRef,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import * as ls from 'local-storage';

import { SmallIconActionButton } from '../TableToolbar';
import { ClickAwayListener, Grow, IconButton, Link, Paper, Popper } from '@mui/material';
import { IconTableClosePopup, SettingIcon } from '../icons';
import { css } from '@emotion/react';
import { styles } from './ColumnSetting.style';
import Button from '../../Button';
import Checkbox from '../../Checkbox';

export interface IColumn {
  id: string;
  dt: ReactNode;
}

const boxShadowStyle = css`
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12);
`;

export interface IColumnVisibleSettingProps {
  name?: string;
  columns: IColumn[];
  defaultColumns: string[];
  visibleColumns: string[];
  isTableStyle?: boolean;
  onSave: (visible: string[]) => void;
  children?: ReactNode;
  className?: string;
  triggerClassName?: string;
}

export function ColumnVisibleSetting(
  {
    name = '',
    columns = [],
    defaultColumns = [],
    visibleColumns = [],
    onSave,
    isTableStyle = false,
    children,
    className = '',
    triggerClassName = '',
  }: IColumnVisibleSettingProps,
  ref: any,
): ReactElement {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const [visible, setVisible] = useState([...visibleColumns]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSave = useCallback(() => {
    if (name) {
      ls.set(`topology-node-detail-${name}-columns`, visible);
    }
    if (onSave instanceof Function) {
      onSave(visible);
    }
    close();
  }, [close, name, onSave, visible]);

  const handleChange = useCallback(
    ({ target: { checked, value } }: ChangeEvent<HTMLInputElement>) => {
      setVisible((prev) => (checked ? prev.concat(value) : prev.filter((id) => id !== value)));
    },
    [],
  );

  const handleToggle = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const onPopperClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const handleClose = useCallback(
    (event: globalThis.MouseEvent | TouchEvent) => {
      if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
        return;
      }

      close();
    },
    [close],
  );

  const restore = useCallback(() => {
    setVisible(defaultColumns);
  }, [defaultColumns]);

  useEffect(() => {
    setVisible(visibleColumns);
  }, [open, visibleColumns]);

  useImperativeHandle(ref, () => ({
    setOpen(open: boolean) {
      setOpen(open);
    },
  }));

  return (
    <div className={className ? className : isTableStyle ? '' : `${styles['detail-setting']}`}>
      {children ? (
        <div
          className={triggerClassName}
          onClick={handleToggle}
          aria-haspopup="true"
          aria-controls={open ? 'menu-list-grow' : undefined}
        >
          {children}
        </div>
      ) : (
        <SmallIconActionButton
          icon={<SettingIcon />}
          onClick={handleToggle}
          aria-haspopup="true"
          aria-controls={open ? 'menu-list-grow' : undefined}
          label={t('Show / Hide Columns')}
          variant="right"
        />
      )}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        css={styles.popper}
        onClick={onPopperClick}
        placement={'bottom-end'}
        style={{ left: 'unset' }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'right top',
            }}
          >
            <Paper css={boxShadowStyle}>
              <ClickAwayListener onClickAway={handleClose}>
                <div css={styles.dialog}>
                  <div css={styles.title}>
                    <h2>{t('Show / Hide Columns')}</h2>
                    <IconButton css={styles.close_icon} onClick={close}>
                      <IconTableClosePopup />
                    </IconButton>
                  </div>
                  <div css={styles.content}>
                    <Link css={styles.restore_Link} onClick={restore}>
                      {t('Restore Defaults')}
                    </Link>
                    <ul css={styles.body}>
                      {columns.map(({ id, dt }, idx) => (
                        <li key={idx}>
                          <Checkbox
                            onChange={handleChange}
                            value={id}
                            label={dt}
                            labelCss={styles.label}
                            checked={visible.includes(id)}
                            color="primary"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div css={styles.buttons}>
                    <Button
                      onClick={handleSave}
                      color={'primary'}
                      disabled={!visible.length}
                      autoFocus
                      variant="contained"
                      size="small"
                    >
                      {t('Save')}
                    </Button>
                    <Button
                      onClick={close}
                      css={styles.cancel_btn}
                      color="primary"
                      variant="text"
                      size="small"
                    >
                      {t('Cancel')}
                    </Button>
                  </div>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default forwardRef(ColumnVisibleSetting);
