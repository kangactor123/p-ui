import React, { ReactElement, ReactNode, useContext } from 'react';
import {
  CheckboxProps as MUICheckboxProps,
  Theme,
  ThemeProvider,
  Checkbox as MUICheckbox,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material';
import { PlayceThemeContext } from '../../../../providers';
import { cx } from '@emotion/css';

export interface ICheckboxProps extends MUICheckboxProps {
  label?: ReactNode;
  labelProps?: Partial<FormControlLabelProps>;
}

function Checkbox(props: ICheckboxProps): ReactElement {
  const { labelProps = {}, label, disabled = false, ...checkProps } = props;
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme as Theme}>
      <FormControl>
        <FormControlLabel
          {...labelProps}
          control={
            <MUICheckbox
              {...checkProps}
              disabled={disabled}
              icon={<span className={cx('checkbox', disabled ? 'disabledBox' : 'regularBox')} />}
              checkedIcon={<span className={cx('checkbox', disabled ? 'disabledCheckedBox' : 'checkedBox')} />}
              disableRipple
            />
          }
          label={label}
          className={'checkbox-group'}
        />
      </FormControl>
    </ThemeProvider>
  );
}

Checkbox.defaultProps = {
  color: 'primary',
};

export default Checkbox;
