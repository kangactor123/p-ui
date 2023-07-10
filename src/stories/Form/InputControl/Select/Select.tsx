/* eslint-disable @typescript-eslint/naming-convention */
import React, { ElementType, ReactElement, ReactNode, useCallback, useContext } from 'react';
import {
  SelectProps as MUISelectProps,
  SelectChangeEvent,
  Theme,
  ThemeProvider,
} from '@mui/material';
import { css, cx } from '@emotion/css';
import { useTranslation } from 'react-i18next';
import { FieldValues, useController } from 'react-hook-form';
import { TControl, TSize } from '../../../../common/type';
import { labelStyle, SelectComponent, splitStyle, MenuItem } from './Select.style';
import { isArray } from 'lodash';
import Spinner, { SpinnerSize, SpinnerType } from '../../../Spinner';
import { DropdownDownIcon, DropdownDownGrayIcon } from '../../../icons';
import { PlayceThemeContext } from '../../../../providers';
import { Size } from '../../../../common/enum';
import Checkbox from '../../../Checkbox';

export interface ISelectOption {
  value: any;
  label: ReactNode;
  hidden?: boolean;
  selected?: boolean;
  disabled?: boolean;
  split?: boolean;
  description?: string;
}

export type ISelectProps<T extends FieldValues> = {
  options: ISelectOption[];
  icon?: ElementType;
  loading?: boolean;
  isWidgetFilter?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (e: SelectChangeEvent<T>) => void;
  noDataLabel?: string;
  size?: TSize;
} & Omit<MUISelectProps, 'onChange'> &
  TControl<T>;

function Select<T extends FieldValues>({
  displayEmpty = true,
  variant = 'outlined',
  loading = false,
  ...props
}: ISelectProps<T>): ReactElement {
  const {
    children,
    options,
    icon,
    disabled,
    name,
    control,
    rules,
    placeholder,
    defaultValue,
    multiple,
    noDataLabel = '',
    size = Size.M,
    MenuProps = {},
  } = props;
  const { sx, anchorOrigin, transformOrigin, ...Menu } = MenuProps;
  const theme = useContext(PlayceThemeContext);
  const { t } = useTranslation();
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    rules,
    control,
  });

  const handleChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      onChange(event);
      if (props?.onChange instanceof Function) {
        props?.onChange(event);
      }
    },
    [props, onChange],
  );

  const MenuSx = {
    '& .MuiPaper-root': {
      boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
      transform: 'translateY(7px) !important',
    },
    '& .MuiList-root': {
      padding: '4px',
    },
    ...sx,
  };

  const renderLabel = (label: React.ReactNode) => (
    <span title={typeof label === 'string' ? label : ''} css={labelStyle}>
      {label}
    </span>
  );

  return (
    <ThemeProvider theme={theme as Theme}>
      <SelectComponent
        {...props}
        className={cx('wrap')}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
            ...anchorOrigin,
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
            ...transformOrigin,
          },
          sx: MenuSx,
          ...Menu,
        }}
        displayEmpty={displayEmpty}
        variant={variant}
        IconComponent={icon || disabled ? DropdownDownGrayIcon : DropdownDownIcon}
        disabled={disabled || loading}
        onChange={handleChange}
        onBlur={onBlur}
        value={value || []}
        renderValue={() =>
          value ? options.find((option) => option.value === value)?.label : placeholder
        }
        size={size}
        selected={!!value}
        {...(defaultValue && { defaultValue: { defaultValue } })}
      >
        {children}
        {loading ? (
          <MenuItem key={1}>
            {t('Loading...')}
            <Spinner loading={loading} type={SpinnerType.spin} size={SpinnerSize.small} />
          </MenuItem>
        ) : options && options.length > 0 ? (
          options.map(({ label, split, value: optionsValue, hidden, disabled, description }) =>
            split ? (
              <div key={optionsValue} css={splitStyle}>
                {optionsValue}
              </div>
            ) : (
              !hidden && (
                <MenuItem key={optionsValue} value={optionsValue} disabled={disabled}>
                  {multiple ? (
                    <>
                      <Checkbox
                        value={value}
                        checked={isArray(value) && value.includes(optionsValue)}
                      />
                      {renderLabel(label)}
                    </>
                  ) : description ? (
                    <div>
                      {renderLabel(label)}
                      <div>{description}</div>
                    </div>
                  ) : (
                    renderLabel(label)
                  )}
                </MenuItem>
              )
            ),
          )
        ) : (
          <MenuItem>
            <span css={labelStyle}>{t(noDataLabel)}</span>
          </MenuItem>
        )}
      </SelectComponent>
    </ThemeProvider>
  );
}

export default Select;
