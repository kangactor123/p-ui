/* eslint-disable @typescript-eslint/naming-convention */
import React, { ElementType, ReactElement, ReactNode } from 'react';
import { ListItemText, SelectProps as MUISelectProps, Select as MuiSelect } from '@mui/material';
import { cx } from '@emotion/css';
import { TSize } from '../../../../common/type';
import {
  labelStyle,
  splitStyle,
  MenuItem,
  optionWrapper,
  wrap,
  multiLabel,
  multiCheckbox,
} from './Select.style';
import { isArray } from 'lodash';
import { ThemeProvider } from '../../../../providers';
import Checkbox from '../../../Checkbox';
import { DropdownDownGrayIcon, DropdownDownIcon } from '../../../icons';
import { useTranslation } from 'react-i18next';
import { useEmotionTheme } from '../../../../common/theme';

export interface ISelectOption {
  hidden?: boolean;
  value: any;
  label: ReactNode;
  disabled?: boolean;
  split?: boolean;
  description?: string;
}

export type ISelectProps<T> = {
  options: ISelectOption[];
  icon?: ElementType;
  loading?: boolean;
  isWidgetFilter?: boolean;
  menuClassName?: string;
  size?: TSize;
  widthSize?: TSize;
} & MUISelectProps;

function Select<T extends ISelectOption>({
  displayEmpty = true,
  variant = 'outlined',
  loading = false,
  className,
  menuClassName,
  ...props
}: ISelectProps<T>): ReactElement {
  const { t } = useTranslation();
  const { children, options, multiple, value: values = '', icon, disabled } = props;
  const emotionTheme = useEmotionTheme();
  const renderLabel = (label: React.ReactNode) => (
    <span title={typeof label === 'string' ? label : ''} css={labelStyle(emotionTheme)}>
      {label}
    </span>
  );

  return (
    <ThemeProvider>
      <MuiSelect
        {...props}
        className={className}
        css={wrap}
        variant={variant}
        displayEmpty={displayEmpty}
        IconComponent={icon || disabled ? DropdownDownGrayIcon : DropdownDownIcon}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          className: menuClassName,
        }}
        disabled={disabled || loading}
      >
        {children}
        {options &&
          options?.length > 0 &&
          options.map(({ label, split, value, hidden, disabled, description, ...props }, index) =>
            split ? (
              <div key={index} css={splitStyle}>
                {value}
              </div>
            ) : (
              (!values || !hidden) && (
                <MenuItem
                  key={index}
                  value={value}
                  className={multiLabel}
                  disabled={disabled}
                  {...props}
                >
                  {multiple ? (
                    <>
                      <Checkbox
                        css={multiCheckbox}
                        value={values}
                        checked={isArray(values) && values.includes(value)}
                        label={renderLabel(label)}
                      />
                    </>
                  ) : description ? (
                    <div css={optionWrapper}>
                      {renderLabel(label)}
                      <div className="desc">{description}</div>
                    </div>
                  ) : (
                    <ListItemText
                      css={labelStyle(emotionTheme)}
                      title={label?.toString()}
                      primary={label}
                    />
                  )}
                </MenuItem>
              )
            ),
          )}
      </MuiSelect>
    </ThemeProvider>
  );
}

export default Select;
