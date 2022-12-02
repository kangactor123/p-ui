import React, { ReactElement, ReactNode, useContext } from 'react';
import { CheckboxProps as MUICheckboxProps, Theme, ThemeProvider, Checkbox as MUICheckbox } from '@mui/material';
import { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { PlayceThemeContext } from '../../../../providers';
import { disabledBox, FormControlLabel, checkbox, regularBox, checkedBox, disabledCheckedBox } from './Checkbox.style';

export interface ICheckboxProps extends MUICheckboxProps {
  label?: ReactNode;
  labelProps?: Partial<FormControlLabelProps>;
}

function Checkbox(props: ICheckboxProps): ReactElement {
  const { labelProps = {}, label, disabled = false, ...checkProps } = props;
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme as Theme}>
      <FormControlLabel
        {...labelProps}
        control={
          <MUICheckbox
            {...checkProps}
            disabled={disabled}
            icon={<span className={'icon'} css={[checkbox, disabled ? disabledBox : regularBox]} />}
            checkedIcon={
              <span className={'checkedIcon'} css={[checkbox, disabled ? disabledCheckedBox : checkedBox]} />
            }
            disableRipple
          />
        }
        label={label}
      />
    </ThemeProvider>
  );
}

Checkbox.defaultProps = {
  color: 'primary',
};

export default Checkbox;
