import React, { ReactElement, ReactNode } from 'react';
// import { useTranslation } from 'react-i18next';
import { FormControlLabel, Radio as MUIRadio, RadioProps } from '@mui/material';
import { ThemeProvider } from '../../providers';

export interface IRadioProps extends RadioProps {
  label?: ReactNode;
}

function Radio({ label, ...props }: IRadioProps): ReactElement {
  // const { t } = useTranslation();

  return (
    <ThemeProvider>
      <FormControlLabel
        className="playce-radio"
        label={label}
        control={
          <MUIRadio
            disableRipple
            icon={<span />}
            checkedIcon={<span className="playce-radio-icon-checked" />}
            {...props}
          />
        }
      />
    </ThemeProvider>
  );
}

export default Radio;
