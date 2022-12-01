/* eslint-disable @typescript-eslint/naming-convention */
import React, { ElementType, ReactElement, useCallback, useContext } from 'react';
import { SelectProps as MUISelectProps, MenuItem, SelectChangeEvent, Theme, ThemeProvider } from '@mui/material';
import { cx } from '@emotion/css';
import { useTranslation } from 'react-i18next';
import { FieldValues, useController } from 'react-hook-form';
import { TControl } from '../../../../common/type';
import { labelStyle, SelectComponent, splitStyle } from './Select.style';
import Checkbox from '../Checkbox';
import { isArray } from 'lodash';
import Spinner, { SpinnerSize, SpinnerType } from '../../../Spinner';
import { IconSelectArrow } from '../../../icons';
import { PlayceThemeContext } from '../../../../providers';

export interface ISelectOption {
  hidden?: boolean;
  value: any;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  split?: boolean;
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
  } = props;
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

  return (
    <ThemeProvider theme={theme as Theme}>
      <SelectComponent
        {...props}
        className={cx('wrap')}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          sx: {
            maxWidth: 640,
          },
        }}
        displayEmpty={displayEmpty}
        variant={variant}
        IconComponent={icon || IconSelectArrow}
        disabled={disabled || loading}
        onChange={handleChange}
        onBlur={onBlur}
        value={value || []}
        renderValue={() => (value ? options.find((option) => option.value === value)?.label : placeholder)}
        {...(defaultValue && { defaultValue: { defaultValue } })}
      >
        {children}
        {loading ? (
          <MenuItem key={1}>
            {t('Loading...')}
            <Spinner loading={loading} type={SpinnerType.spin} size={SpinnerSize.small} />
          </MenuItem>
        ) : options && options.length > 0 ? (
          options.map(({ label, split, value: optionsValue, hidden, disabled }) =>
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
                        labelProps={{ sx: { marginRight: 0 } }}
                        checked={isArray(value) && value.includes(optionsValue)}
                      />
                      <span title={label} css={labelStyle}>
                        {label}
                      </span>
                    </>
                  ) : (
                    <span title={label} css={labelStyle}>
                      {label}
                    </span>
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
