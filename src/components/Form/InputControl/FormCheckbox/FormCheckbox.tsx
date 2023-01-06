import React, { ReactElement, ReactNode, useContext } from 'react';
import {
  CheckboxProps as MUICheckboxProps,
  ThemeProvider,
  Checkbox as MUICheckbox,
  FormControlLabelProps,
} from '@mui/material';
import { PlayceThemeContext } from '../../../../providers';
import { cx } from '@emotion/css';
import { FormControlLabel } from './FormCheckbox.style';
import Checkbox from '../../../Checkbox';
// import { useTranslation } from 'react-i18next';

export interface IFormCheckboxProps extends MUICheckboxProps {
  label?: ReactNode;
  labelProps?: Partial<FormControlLabelProps>;
}

function FormCheckbox(props: IFormCheckboxProps): ReactElement {
  const { labelProps = {}, label, ...checkProps } = props;
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        {...labelProps}
        control={<Checkbox {...checkProps} />}
        label={label}
        className={'checkbox-group'}
      />
    </ThemeProvider>
  );
}

FormCheckbox.defaultProps = {
  color: 'primary',
};

export default FormCheckbox;
