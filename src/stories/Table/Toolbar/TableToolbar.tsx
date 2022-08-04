/* eslint-disable @typescript-eslint/ban-types */
import { ClassNames } from '@emotion/react';
import { Button, IconButton, Input } from '@mui/material';
import { MouseEvent, MouseEventHandler, PropsWithChildren, ReactElement, useCallback, useState } from 'react';
import { TableInstance } from 'react-table';
import { IconCsvDownload, IconTableFilterDefault, IconTableRefresh, IconUploadClose } from '../../../common/icons';
import { Translation } from '../../../common/type';
import { MUIToolbar, MUITooltip } from '../style/table.style';
import { TableMouseEventHandler } from '../Type/react-table-config';

type InstanceActionButton<T extends object> = {
  instance: TableInstance<T>;
  icon?: JSX.Element;
  onClick: TableMouseEventHandler;
  enabled?: (instance: TableInstance<T>) => boolean;
  label: string;
  variant?: 'right' | 'left';
};

type ActionButton<T extends object> = {
  icon?: JSX.Element;
  onClick: MouseEventHandler;
  enabled?: boolean;
  label: string;
  variant?: 'right' | 'left';
};

export const InstanceLabeledActionButton = <T extends object>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
}: InstanceActionButton<T>): ReactElement => {
  return (
    <Button variant="contained" color="primary" onClick={onClick(instance)} disabled={!enabled(instance)}>
      {icon}
      {label}
    </Button>
  );
};

export const LabeledActionButton = <T extends object>({
  icon,
  onClick,
  label,
  enabled = true,
}: ActionButton<T>): ReactElement => {
  return (
    <Button variant="contained" color="primary" onClick={onClick} disabled={!enabled}>
      {icon}
      {label}
    </Button>
  );
};

export const InstanceSmallIconActionButton = <T extends object>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
  variant,
}: InstanceActionButton<T>) => {
  return (
    <ClassNames>
      {({ cx }) => (
        <MUITooltip arrow title={label} aria-label={label}>
          <span>
            <IconButton
              className={cx({ rightIcons: variant === 'right' }, { leftIcons: variant === 'left' })}
              onClick={onClick(instance)}
              disabled={!enabled(instance)}
            >
              {icon}
            </IconButton>
          </span>
        </MUITooltip>
      )}
    </ClassNames>
  );
};

export const SmallIconActionButton = <T extends object>({
  icon,
  onClick,
  label,
  enabled = true,
  variant,
}: ActionButton<T>) => {
  return (
    <ClassNames>
      {({ cx }) => (
        <MUITooltip arrow title={label} aria-label={label}>
          <span style={{ display: 'inline-block' }}>
            <IconButton
              className={cx({ rightIcons: variant === 'right' }, { leftIcons: variant === 'left' })}
              onClick={onClick}
              disabled={!enabled}
            >
              {icon}
            </IconButton>
          </span>
        </MUITooltip>
      )}
    </ClassNames>
  );
};

type TableToolbar<T extends object> = {
  instance: TableInstance<T>;
  globalFilter?: string;
  setGlobalFilter?: any;
  useColumnFilter?: boolean;
  setUseColumnFilter?: any;
  onAdd?: TableMouseEventHandler;
  onDelete?: TableMouseEventHandler;
  onEdit?: TableMouseEventHandler;
  onRefresh?: (e: any) => void;
  onSearchKeyword?: (e: any) => void;
  downloadCSV: () => void;
  isSearchStyle?: boolean;
  useServerPaging?: boolean;
  columnVisibleSettingExclude?: string[];
  t: Translation;
};

export function TableToolbar<T extends object>({
  instance,
  globalFilter,
  setGlobalFilter,
  useColumnFilter = false,
  setUseColumnFilter,
  onAdd,
  onDelete,
  onEdit,
  onRefresh,
  onSearchKeyword,
  downloadCSV,
  isSearchStyle = true,
  useServerPaging = false,
  columnVisibleSettingExclude = [],
  t,
}: PropsWithChildren<TableToolbar<T>>): ReactElement | null {
  const { columns } = instance;
  const [searchKeyword, setSearchKeyword] = useState(globalFilter);
  const [refreshKey, setRefreshKey] = useState(Math.random());

  const handleFilterClick = useCallback(
    (event: MouseEvent) => {
      instance.setAllFilters([]);
      setUseColumnFilter((prev: boolean) => !prev);
    },
    [instance, setUseColumnFilter],
  );

  const search = useCallback(() => {
    if (onSearchKeyword) {
      onSearchKeyword(searchKeyword);
      setGlobalFilter(undefined);
    }
    if (setGlobalFilter instanceof Function) {
      setGlobalFilter(searchKeyword || undefined);
    }
  }, [searchKeyword, setGlobalFilter, onSearchKeyword]);

  const handleKeywordChange = useCallback(({ target: { value } }: any) => {
    setSearchKeyword(value);
  }, []);

  const handleKeywordKeyDown = useCallback(
    (event: any) => {
      if (event.keyCode === 13) {
        search();
      }
    },
    [search],
  );

  const handleKeywordBlur = useCallback(
    (event: any) => {
      search();
    },
    [search],
  );

  const handleDeleteSearchKeyword = useCallback(() => {
    setSearchKeyword('');
    setGlobalFilter(undefined);
    if (onSearchKeyword) {
      onSearchKeyword('');
      return;
    }
  }, [onSearchKeyword, setGlobalFilter]);

  const handleRefresh = useCallback(
    (event: any) => {
      setRefreshKey(Math.random());
      if (onRefresh instanceof Function) {
        onRefresh(event);
      }
    },
    [onRefresh],
  );

  return (
    <ClassNames>
      {({ cx, css }) => (
        <MUIToolbar>
          <div className={'input-wrap'}>
            <Input
              className={cx({ isSearchStyle }, 'search-input')}
              onChange={handleKeywordChange}
              onKeyDown={handleKeywordKeyDown}
              onBlur={handleKeywordBlur}
              value={searchKeyword || ''}
              inputProps={{
                placeholder: t('Search'),
              }}
            />
            {searchKeyword && (
              <IconButton className={'search-input-clear'} onClick={handleDeleteSearchKeyword}>
                <IconUploadClose />
              </IconButton>
            )}
          </div>
          <div className={'right-buttons'}>
            {!useServerPaging ? (
              <>
                <SmallIconActionButton<T>
                  icon={<IconTableFilterDefault />}
                  onClick={handleFilterClick}
                  label={t('Filter by columns')}
                  variant="right"
                />
                <SmallIconActionButton<T>
                  icon={<IconCsvDownload />}
                  onClick={downloadCSV}
                  label={t('Export to CSV')}
                  variant="right"
                />
              </>
            ) : null}

            {onRefresh && (
              <SmallIconActionButton<T>
                key={refreshKey}
                icon={<IconTableRefresh />}
                onClick={handleRefresh}
                label={t('Refresh')}
                variant="right"
              />
            )}
          </div>
        </MUIToolbar>
      )}
    </ClassNames>
  );
}
