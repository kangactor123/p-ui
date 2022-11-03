import React, { ChangeEvent, ReactElement, useCallback } from 'react';
import { TextFieldProps, TextField } from '@mui/material';
import { FieldValues, useController } from 'react-hook-form';
import { TControl } from '../../../../common/type';

export type TInputTextProps<T extends FieldValues> = TextFieldProps & TControl<T>;

/**
 * @returns control 로 다룰수 있는 InputText
 */
function InputText<T extends FieldValues>({
  inputProps = {},
  variant = 'outlined',
  name,
  rules,
  control,
  onChange,
  ...props
}: TInputTextProps<T>): ReactElement {
  const {
    field: { value, onChange: controlChange },
  } = useController({
    name,
    rules,
    control,
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      controlChange(event);
      if (onChange instanceof Function) {
        onChange(event);
      }
    },
    [controlChange, onChange],
  );

  return (
    <TextField
      variant={variant}
      value={value}
      onChange={handleChange}
      inputProps={{ maxLength: 255, ...inputProps }}
      {...props}
    />
  );
}

export default InputText;
