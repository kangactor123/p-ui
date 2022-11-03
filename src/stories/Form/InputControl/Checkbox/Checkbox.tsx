import React, { ReactElement, ReactNode } from 'react';
import { Checkbox as MUICheckbox, CheckboxProps as MUICheckboxProps } from '@mui/material';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

export interface ICheckboxProps extends MUICheckboxProps {
  label?: ReactNode;
  labelProps?: Partial<FormControlLabelProps>;
}

function Checkbox(props: ICheckboxProps): ReactElement {
  const { labelProps = {}, label, ...checkProps } = props;

  return <FormControlLabel {...labelProps} control={<MUICheckbox {...checkProps} />} label={label} />;
}

Checkbox.defaultProps = {
  color: 'primary',
};

export default Checkbox;
