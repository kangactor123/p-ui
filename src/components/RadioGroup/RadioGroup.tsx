import React, { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from '../../providers';
import { RadioGroup as MUIRadioGroup, RadioGroupProps as MUIRadioGroupProps } from '@mui/material';
import Radio from '../Radio';
import { cx } from '@emotion/css';

export type RadioOption = {
  label: ReactNode;
  value: string | boolean;
  checked?: boolean;
  disabled?: boolean;
};

export interface RadioGroupProps<T extends string | boolean = string>
  extends Omit<MUIRadioGroupProps, 'onChange'> {
  options?: RadioOption[];
  onChange?: (value: T) => void;
  useBooleanVal: boolean;
}

function RadioGroup<T extends string | boolean = string>({
  options,
  className,
  useBooleanVal,
  onChange,
  ...props
}: RadioGroupProps<T>): ReactElement {
  // const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const returnValue = useBooleanVal ? value === 'true' : value;
    if (onChange instanceof Function) {
      onChange(returnValue as T);
    }
  };

  return (
    <ThemeProvider>
      <MUIRadioGroup
        className={cx('playce-radio-group', className)}
        onChange={handleChange}
        {...props}
      >
        {options?.map((option) => (
          <Radio {...option} />
        ))}
      </MUIRadioGroup>
    </ThemeProvider>
  );
}

export default RadioGroup;
