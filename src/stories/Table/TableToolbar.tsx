/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Button, IconButton, Toolbar, TooltipClasses } from '@mui/material';
import React, {
  ChangeEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useState,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import { TableInstance } from 'react-table';
import {
  IconTableRefresh,
  IconTableFilterDefault,
  IconTableCsvDownload,
  IconTableUploadClose,
} from './icons';

import { TableMouseEventHandler } from './types/react-table-config';
import { ColumnHidePage } from './ColumnHidePage';

import { useTranslation } from 'react-i18next';
import { downloadReport } from './utils';

import { css } from '@emotion/react';
import { cx } from '@emotion/css';
import Tooltip from '../Tooltip';
import InputText from './InputText';

const tooltipClasses: Partial<TooltipClasses> = {
  arrow: `${css({
    color: 'rgba(0,0,0,0.6)',
  })}`,
  tooltip: `${css({
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginLeft: '5px',
  })}`,
};

export const classes = {
  toolbar: css({
    display: 'flex',
    minHeight: '48px !important',
    justifyContent: 'space-between',
    paddingLeft: 10,
  }),
  search: css({
    position: 'relative',
  }),
  searchInput: css({
    width: 400,
  }),
  leftButtons: css({}),
  rightButtons: css({
    marginRight: '-15px',
    display: 'flex',
  }),
  leftIcons: css({
    '&:first-of-type': {
      marginLeft: -12,
    },
  }),
  rightIcons: css({
    padding: 8,
    // marginTop: '-6px',
    width: 40,
    height: 40,
  }),
  searchInputClear: css({
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 0,
    width: 16,
    height: 16,
  }),
};

type TInstanceActionButton<TModel extends object> = {
  instance: TableInstance<TModel>;
  icon?: JSX.Element;
  onClick: TableMouseEventHandler;
  enabled?: (instance: TableInstance<TModel>) => boolean;
  label: string;
  variant?: 'right' | 'left';
};

type TActionButton = {
  icon?: JSX.Element;
  onClick: MouseEventHandler;
  enabled?: boolean;
  label: string;
  variant?: 'right' | 'left';
};

export const InstanceLabeledActionButton = <TModel extends object>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
}: TInstanceActionButton<TModel>): ReactElement => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick(instance)}
      disabled={!enabled(instance)}
    >
      {icon}
      {label}
    </Button>
  );
};

export const LabeledActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
}: TActionButton): ReactElement => {
  return (
    <Button variant="contained" color="primary" onClick={onClick} disabled={!enabled}>
      {icon}
      {label}
    </Button>
  );
};

export const InstanceSmallIconActionButton = <TModel extends object>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
  variant,
}: TInstanceActionButton<TModel>) => {
  return (
    <Tooltip arrow title={label} aria-label={label} classes={tooltipClasses}>
      <span>
        <IconButton
          className={cx(
            variant === 'right' ? `${classes.rightIcons}` : '',
            variant === 'left' ? `${classes.leftIcons}` : '',
          )}
          onClick={onClick(instance)}
          disabled={!enabled(instance)}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export const SmallIconActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
  variant,
}: TActionButton) => {
  return (
    <Tooltip arrow title={label} aria-label={label} classes={tooltipClasses}>
      <span style={{ display: 'inline-block' }}>
        <IconButton
          className={cx(
            variant === 'right' ? `${classes.rightIcons}` : '',
            variant === 'left' ? `${classes.leftIcons}` : '',
          )}
          onClick={onClick}
          disabled={!enabled}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

interface ITableToolbar<TModel extends object> {
  instance: TableInstance<TModel>;
  globalFilter?: string;
  setGlobalFilter?: any;
  useColumnFilter?: boolean;
  setUseColumnFilter?: any;
  onAdd?: TableMouseEventHandler;
  onDelete?: TableMouseEventHandler;
  onEdit?: TableMouseEventHandler;
  onRefresh?: (e: any) => void;
  onSearchKeyword?: (e: any) => void;
  isSearchStyle?: boolean;
  useServerPaging?: boolean;
  columnVisibleSettingExclude?: string[];
}

export function TableToolbar<TModel extends object>({
  instance,
  globalFilter,
  setGlobalFilter,
  setUseColumnFilter,
  onRefresh,
  onSearchKeyword,
  isSearchStyle = true,
  useServerPaging = false,
  columnVisibleSettingExclude = [],
}: PropsWithChildren<ITableToolbar<TModel>>): ReactElement | null {
  const { columns } = instance;

  const [searchKeyword, setSearchKeyword] = useState(globalFilter);

  const { t } = useTranslation();

  const [refreshKey, setRefreshKey] = useState(Math.random());

  const handleFilterClick = useCallback(() => {
    instance.setAllFilters([]);
    setUseColumnFilter((prev: boolean) => !prev);
  }, [instance, setUseColumnFilter]);

  const search = useCallback(() => {
    if (onSearchKeyword) {
      onSearchKeyword(searchKeyword);
      setGlobalFilter(undefined);
    }
    if (setGlobalFilter instanceof Function) {
      setGlobalFilter(searchKeyword || undefined);
    }
  }, [searchKeyword, setGlobalFilter, onSearchKeyword]);

  const handleKeywordChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(value);
    },
    [],
  );

  const handleKeywordKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.keyCode === 13) {
        search();
      }
    },
    [search],
  );

  const handleKeywordBlur = useCallback(() => {
    search();
  }, [search]);

  const handleDeleteSearchKeyword = useCallback(() => {
    setSearchKeyword('');
    setGlobalFilter(undefined);
    if (onSearchKeyword) {
      onSearchKeyword('');
      return;
    }
  }, [onSearchKeyword, setGlobalFilter]);

  const downloadCsv = useCallback(() => {
    downloadReport<TModel>(columns, instance.data as TModel[], (instance as any).name, t);
  }, [columns, instance, t]);

  const handleRefresh = useCallback(
    (event: MouseEvent) => {
      setRefreshKey(Math.random());
      if (onRefresh instanceof Function) {
        onRefresh(event);
      }
    },
    [onRefresh],
  );

  // toolbar with add, edit, delete, filter/search column select.
  return (
    <Toolbar css={classes.toolbar}>
      <div css={classes.search}>
        <InputText
          className={cx(isSearchStyle ? `${classes.searchInput}` : '', 'search-input')}
          onChange={handleKeywordChange}
          onKeyDown={handleKeywordKeyDown}
          onBlur={handleKeywordBlur}
          variant={'standard'}
          value={searchKeyword || ''}
          inputProps={{
            placeholder: t('Search'),
          }}
        />
        {searchKeyword && (
          <IconButton css={classes.searchInputClear} onClick={handleDeleteSearchKeyword}>
            <IconTableUploadClose />
          </IconButton>
        )}
      </div>
      <div css={classes.rightButtons}>
        {!useServerPaging ? (
          <>
            <SmallIconActionButton
              icon={<IconTableFilterDefault />}
              onClick={handleFilterClick}
              label={t('Filter by columns')}
              variant="right"
            />
            <SmallIconActionButton
              icon={<IconTableCsvDownload />}
              onClick={downloadCsv}
              label={t('Export to CSV')}
              variant="right"
            />
          </>
        ) : null}
        {onRefresh && (
          <SmallIconActionButton
            key={refreshKey}
            icon={<IconTableRefresh />}
            onClick={handleRefresh}
            label={t('Refresh')}
            variant="right"
          />
        )}
        <ColumnHidePage<TModel> instance={instance} exclude={columnVisibleSettingExclude} />
      </div>
    </Toolbar>
  );
}