import React, { ReactElement, useState, useCallback, useEffect, ChangeEvent } from 'react';
import { TextFieldProps, TextField } from '@mui/material';

function InputText({ value, InputProps, variant = 'outlined', ...props }: TextFieldProps): ReactElement {
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
    <TextField {...props} variant={variant} InputProps={InputProps} onChange={onChangeHanlder} value={inputValue} />
  );
}

export default InputText;
