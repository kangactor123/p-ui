import React, { ReactElement, ReactNode } from 'react';
import { CheckboxProps as MUICheckboxProps, Checkbox as MUICheckbox } from '@mui/material';
import { ThemeProvider } from '../../providers';
import Tooltip from '../Tooltip';
import { FormControlLabel } from './Checkbox.style';

export interface ICheckboxProps extends MUICheckboxProps {
  label?: ReactNode;
  useEllipsis?: boolean;
  useTooltip?: boolean;
}

function Checkbox({
  label,
  disableRipple = true,
  useEllipsis = false,
  useTooltip,
  ...props
}: ICheckboxProps): ReactElement {
  return (
    <ThemeProvider>
      <Tooltip title={useTooltip && label} arrow>
        <FormControlLabel
          className="playce-checkbox"
          label={label}
          useEllipsis={useEllipsis}
          control={
            <MUICheckbox
              disableRipple
              icon={<span className="playce-checkbox-icon" />}
              checkedIcon={<span className="playce-checkbox-checked" />}
              {...props}
            />
          }
        />
      </Tooltip>
    </ThemeProvider>
  );
}

export default Checkbox;
