/* eslint-disable @typescript-eslint/naming-convention */
import React, { ElementType, ReactElement, ReactNode, useContext } from 'react';
import { ListItemText, SelectProps as MUISelectProps } from '@mui/material';
import { cx } from '@emotion/css';
import { TSize } from '../../../../common/type';
import {
  labelStyle,
  SelectComponent,
  splitStyle,
  MenuItem,
  optionWrapper,
  wrap,
  menu,
  multiLabel,
  multiCheckbox,
} from './Select.style';
import { isArray } from 'lodash';
import { PlayceThemeContext, ThemeProvider } from '../../../../providers';
import { Size } from '../../../../common/enum';
import Checkbox from '../../../Checkbox';
import { useTheme } from '@emotion/react';

export interface ISelectOption {
  hidden?: boolean;
  value: any;
  label: ReactNode;
  selected?: boolean;
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
} & MUISelectProps;

function Select<T extends ISelectOption>({
  displayEmpty = true,
  variant = 'outlined',
  loading = false,
  className,
  menuClassName,
  ...props
}: ISelectProps<T>): ReactElement {
  // const { t } = useTranslation();
  const { children, options, multiple, value: values = '', icon, disabled, size = Size.M } = props;
  const theme = useContext(PlayceThemeContext);
  const emotionTheme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <SelectComponent
        className={className}
        css={wrap}
        {...props}
        variant={variant}
        displayEmpty={displayEmpty}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          className: menuClassName,
          css: menu,
        }}
        disabled={disabled || loading}
        size={size}
      >
        {children}
        {options &&
          options?.length > 0 &&
          options.map(({ label, split, value, hidden, disabled, description, ...props }, index) =>
            split ? (
              <div key={index} css={splitStyle}></div>
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
                      />
                      <ListItemText
                        css={labelStyle(emotionTheme)}
                        title={label?.toString()}
                        primary={label}
                      />
                    </>
                  ) : description ? (
                    <div css={optionWrapper}>
                      <ListItemText
                        css={labelStyle(emotionTheme)}
                        title={label?.toString()}
                        primary={label}
                      />
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
      </SelectComponent>
    </ThemeProvider>
  );
}

export default Select;
