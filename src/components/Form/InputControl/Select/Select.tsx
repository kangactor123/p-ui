/* eslint-disable @typescript-eslint/naming-convention */
import React, { ElementType, ReactElement, ReactNode, useContext } from 'react';
import { ListItemText, SelectProps as MUISelectProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TSize } from '../../../../common/type';
import {
  SelectComponent,
  splitStyle,
  MenuItem,
  menu,
  wrap,
  labelStyle,
  loadingStyle,
} from './Select.style';
import { isArray } from 'lodash';
import Spinner, { SpinnerSize, SpinnerType } from '../../../Spinner';
import { DropdownDownIcon, DropdownDownGrayIcon } from '../../../icons';
import { PlayceThemeContext, ThemeProvider } from '../../../../providers';
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

export type ISelectProps<T> = {
  options: T[];
  icon?: ElementType;
  loading?: boolean;
  isWidgetFilter?: boolean;
  menuClassName?: string;
  size?: TSize;
  disabled?: boolean;
} & MUISelectProps;

function Select<T extends ISelectOption>({
  displayEmpty = true,
  variant = 'outlined',
  loading = false,
  className,
  menuClassName,
  ...props
}: ISelectProps<T>): ReactElement {
  const { children, options, multiple, value: values = '', icon, disabled, size = Size.S } = props;
  const theme = useContext(PlayceThemeContext);
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      {multiple ? (
        <SelectComponent
          {...props}
          className={className}
          css={wrap}
          MenuProps={{
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            className: menuClassName,
            css: menu,
          }}
          displayEmpty={displayEmpty}
          variant={variant}
          IconComponent={icon || disabled ? DropdownDownGrayIcon : DropdownDownIcon}
          disabled={disabled || loading}
          size={size}
        >
          {children}
          {loading ? (
            <MenuItem key={1} value={props?.value as T['value']}>
              {t('Loading...')}
              <Spinner loading={loading} type={SpinnerType.spin} size={SpinnerSize.small} />
            </MenuItem>
          ) : (
            options &&
            options.length > 0 &&
            options.map(({ label, split, value: optionsValue, disabled, ...props }) =>
              split ? (
                <div key={optionsValue} css={splitStyle}>
                  {optionsValue}
                </div>
              ) : (
                <MenuItem key={optionsValue} value={optionsValue} disabled={disabled} {...props}>
                  <Checkbox
                    value={optionsValue}
                    checked={isArray(values) && values.includes(optionsValue)}
                  />
                  <ListItemText css={labelStyle} title={label?.toString()} primary={label} />
                </MenuItem>
              ),
            )
          )}
        </SelectComponent>
      ) : (
        <SelectComponent
          {...props}
          className={className}
          css={wrap}
          MenuProps={{
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            className: menuClassName,
          }}
          displayEmpty={displayEmpty}
          variant={variant}
          IconComponent={icon || disabled ? DropdownDownGrayIcon : DropdownDownIcon}
          disabled={disabled || loading}
        >
          {children}
          {loading ? (
            <MenuItem key={1} value={props?.value as T['value']}>
              {t('Loading...')}
              <Spinner
                css={loadingStyle}
                loading={loading}
                type={SpinnerType.spin}
                size={SpinnerSize.small}
              />
            </MenuItem>
          ) : (
            options &&
            options?.length > 0 &&
            options.map(({ hidden, value, label, split, disabled, ...props }: T, index) =>
              split ? (
                <div key={index} css={splitStyle}></div>
              ) : (
                (!values || !hidden) && (
                  <MenuItem css={labelStyle} key={index} value={value} disabled={disabled}>
                    <span title={label?.toString()}>{label}</span>
                  </MenuItem>
                )
              ),
            )
          )}
        </SelectComponent>
      )}
    </ThemeProvider>
  );
}

export default Select;
