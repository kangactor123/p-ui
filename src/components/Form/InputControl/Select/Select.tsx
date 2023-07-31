/* eslint-disable @typescript-eslint/naming-convention */
import React, { ReactElement, ReactNode } from 'react';
import {
  FormControlProps,
  SelectProps as MUISelectProps,
  Select as MuiSelect,
  MenuItem,
  FormControl,
} from '@mui/material';
import { cx } from '@emotion/css';
import { wrap } from './Select.style';
import { ThemeProvider } from '../../../../providers';
import { DropdownDownGrayIcon, DropdownDownIcon } from '../../../icons';
import { useTranslation } from 'react-i18next';
import { Size } from '../../../../common/enum';

export interface ISelectOption {
  value: any;
  label: ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  split?: boolean;
  description?: string;
}

export type ISelectProps = {
  options: ISelectOption[];
  loading?: boolean;
} & MUISelectProps &
  Pick<FormControlProps, 'size' | 'disabled'>;

function Select(props: ISelectProps): ReactElement {
  const { t } = useTranslation();
  const {
    displayEmpty = true,
    variant = 'outlined',
    loading = false,
    className,
    size = Size.M,
    options,
    multiple,
    disabled,
  } = props;

  // const renderLabel = (label: React.ReactNode) => (
  //   <span title={typeof label === 'string' ? label : ''} css={labelStyle(emotionTheme)}>
  //     {label}
  //   </span>
  // );
  return (
    <ThemeProvider>
      <FormControl size={size} disabled={disabled}>
        <MuiSelect
          className={cx('playce-select', className)}
          css={wrap}
          variant={variant}
          displayEmpty={displayEmpty}
          IconComponent={disabled ? DropdownDownGrayIcon : DropdownDownIcon}
          {...props}
        >
          {/* 추후 menu 컴포넌트에서 진행하여 사용 */}
          {options.map(({ value, label }) => (
            <MenuItem value={value}>{label}</MenuItem>
          ))}
          {/* {options &&
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
            )} */}
        </MuiSelect>
      </FormControl>
    </ThemeProvider>
  );
}

export default Select;
