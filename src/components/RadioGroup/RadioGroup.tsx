import React, { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from '../../providers';
import { RadioGroup as MUIRadioGroup, RadioGroupProps as MUIRadioGroupProps } from '@mui/material';
import Radio from '../Radio';
import { cx } from '@emotion/css';

export interface RadioGroupProps extends MUIRadioGroupProps {
  options?: {
    label: ReactNode;
    value: unknown;
    checked?: boolean;
    disabled?: boolean;
  }[];
}

function RadioGroup({ options, className, ...props }: RadioGroupProps): ReactElement {
  // const { t } = useTranslation();

  return (
    <ThemeProvider>
      <MUIRadioGroup className={cx('playce-radio-group', className)} {...props}>
        {options?.map((option) => (
          <Radio {...option} />
        ))}
      </MUIRadioGroup>
    </ThemeProvider>
  );
}

export default RadioGroup;
