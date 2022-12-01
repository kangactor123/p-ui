import React, { ReactElement, ReactNode, useContext } from 'react';
import { Checkbox as MUICheckbox, CheckboxProps as MUICheckboxProps, Theme, ThemeProvider } from '@mui/material';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { PlayceThemeContext } from '../../../../providers';

export interface ICheckboxProps extends MUICheckboxProps {
  label?: ReactNode;
  labelProps?: Partial<FormControlLabelProps>;
}

function Checkbox(props: ICheckboxProps): ReactElement {
  const { labelProps = {}, label, ...checkProps } = props;
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme as Theme}>
      <FormControlLabel {...labelProps} control={<MUICheckbox {...checkProps} />} label={label} />
    </ThemeProvider>
  );
}

Checkbox.defaultProps = {
  color: 'primary',
};

export default Checkbox;
