import React, { ReactElement, useState, useCallback, useEffect, ChangeEvent } from 'react';
import { TextFieldProps, TextField as MuiTextField } from '@mui/material';

export type TInputTextProps = TextFieldProps;

/**
 * @description Lagacy (Deprecated): Control 로 다루지 않는 InputText
 */

function InputText({
  value,
  inputProps = {},
  variant = 'outlined',
  ...props
}: TInputTextProps): ReactElement {
  const [inputValue, setInputValue] = useState<unknown>(value || '');

  const onChangeHanlder = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.persist();
      setInputValue(e.target.value);
      if (props.onChange instanceof Function) {
        props.onChange(e);
      }
    },
    [props],
  );

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <MuiTextField
      variant={variant}
      inputProps={{ maxLength: 255, ...inputProps }}
      {...props}
      onChange={onChangeHanlder}
      value={inputValue}
    />
  );
}

export default InputText;
