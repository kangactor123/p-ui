/* eslint-disable @typescript-eslint/ban-types */
import { Button, IconButton, Theme, Toolbar, Tooltip, createStyles, makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import React, {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { TableInstance } from 'react-table';
import { IconTableRefresh, IconTableFilterDefault, IconCsvDownload, IconUploadClose } from 'common/icons';

import { TableMouseEventHandler } from './types/react-table-config';
import { ColumnHidePage } from './ColumnHidePage';
import { FilterPage } from './FilterPage';
import { InputText } from 'components/FormControls';
import FilterListIcon from '@material-ui/icons/FilterList';

import classNames from 'classnames/bind';
import styles from './Table.module.scss';
import { useTranslation } from 'react-i18next';
import { downloadReport } from './utils';
import { useStylesTooltip } from 'common/helpers';

import { getProjectId } from 'common/lib/utils';
import { useProject, useGetProject } from 'modules/projects';

const cx = classNames.bind(styles);

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      minHeight: '48px',
      justifyContent: 'space-between',
      paddingLeft: 10,
    },
    searchInput: {
      width: 400,
    },
    leftButtons: {},
    rightButtons: {
      marginRight: '-15px',
      display: 'flex',
    },
    leftIcons: {
      '&:first-of-type': {
        marginLeft: -12,
      },
    },
    rightIcons: {
      padding: 8,
      // marginTop: '-6px',
      width: 40,
      height: 40,
    },
    searchInputClear: {
      position: 'absolute',
      right: 8,
      top: 8,
      padding: 0,
      width: 16,
      height: 16,
    },
  }),
);

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
  const classes = useStyles({});
  const tooltipClasses = useStylesTooltip();
  return (
    <Tooltip arrow title={label} aria-label={label} classes={tooltipClasses}>
      <span>
        <IconButton
          className={classnames({ [classes.rightIcons]: variant === 'right', [classes.leftIcons]: variant === 'left' })}
          onClick={onClick(instance)}
          disabled={!enabled(instance)}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export const SmallIconActionButton = <T extends object>({
  icon,
  onClick,
  label,
  enabled = true,
  variant,
}: ActionButton<T>) => {
  const classes = useStyles({});
  const tooltipClasses = useStylesTooltip();
  return (
    <Tooltip arrow title={label} aria-label={label} classes={tooltipClasses}>
      <span style={{ display: 'inline-block' }}>
        <IconButton
          className={classnames({ [classes.rightIcons]: variant === 'right', [classes.leftIcons]: variant === 'left' })}
          onClick={onClick}
          disabled={!enabled}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
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
  isSearchStyle?: boolean;
  useServerPaging?: boolean;
  columnVisibleSettingExclude?: string[];
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
  isSearchStyle = true,
  useServerPaging = false,
  columnVisibleSettingExclude = [],
}: PropsWithChildren<TableToolbar<T>>): ReactElement | null {
  const { columns } = instance;
  const classes = useStyles();
  const [getProject] = useGetProject();

  const [searchKeyword, setSearchKeyword] = useState(globalFilter);

  const { t } = useTranslation();

  const projectId = getProjectId();
  const project = useProject(projectId);

  const [refreshKey, setRefreshKey] = useState(Math.random());

  useEffect(() => {
    if (!project && projectId) {
      getProject(projectId);
    }
  }, [projectId]);

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

  const handleKeywordChange = useCallback(({ target: { value } }) => {
    setSearchKeyword(value);
  }, []);

  const handleKeywordKeyDown = useCallback(
    (event) => {
      if (event.keyCode === 13) {
        search();
      }
    },
    [search],
  );

  const handleKeywordBlur = useCallback(
    (event) => {
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

  const downloadCsv = useCallback(() => {
    downloadReport<T>(columns, instance.data, (instance as any).name, project?.projectName);
  }, [columns, instance, project]);

  const handleRefresh = useCallback(
    (event) => {
      setRefreshKey(Math.random());
      if (onRefresh instanceof Function) {
        onRefresh(event);
      }
    },
    [onRefresh],
  );

  // toolbar with add, edit, delete, filter/search column select.
  return (
    <Toolbar className={classes.toolbar}>
      <div className={styles['search']}>
        <InputText
          className={cx(isSearchStyle ? classes.searchInput : '', 'search-input')}
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
          <IconButton className={classes.searchInputClear} onClick={handleDeleteSearchKeyword}>
            <IconUploadClose />
          </IconButton>
        )}
      </div>
      <div className={classes.rightButtons}>
        {/* <FilterPage<T> instance={instance} onClose={handleClose} show={filterOpen} anchorEl={anchorEl} /> */}
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
              onClick={downloadCsv}
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
        <ColumnHidePage<T> instance={instance} exclude={columnVisibleSettingExclude} />
      </div>
    </Toolbar>
  );
}
