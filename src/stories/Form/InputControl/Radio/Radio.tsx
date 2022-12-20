import React, { ChangeEvent, ReactElement, useContext } from 'react';

import {
  RadioGroup as MUIRadioGroup,
  FormControlLabelProps,
  Radio as MUIRadio,
  RadioGroupProps as MUIRadioGroupProps,
  FormControl,
  ThemeProvider,
  Theme,
  FormControlLabel,
  SxProps,
} from '@mui/material';
import { cx } from '@emotion/css';
import { FieldValues, useController } from 'react-hook-form';
import styled from '@emotion/styled';
import { TControl } from '../../../../common/type';
import { PlayceThemeContext } from '../../../../providers';

export type TRadioOptionProps = Omit<FormControlLabelProps, 'control'>;
export type TRadioColor = 'primary' | 'secondary' | 'default' | undefined;

type TRadioGroupProps = MUIRadioGroupProps;

export type TRadioProps<T extends FieldValues> = {
  options: TRadioOptionProps[];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  radioColor?: TRadioColor;
  size?: 'small' | 'medium';
  flexDirection?: 'row' | 'column';
  radioStyle?: SxProps<Theme>;
} & TRadioGroupProps &
  TControl<T>;

const RadioGroup = styled(MUIRadioGroup)<{ flexDirection: string }>`
  flex-direction: ${({ flexDirection }) => (flexDirection === 'row' ? 'row' : 'column')};
`;

function Radio<T extends FieldValues>({
  flexDirection = 'row',
  onChange,
  name,
  rules,
  control,
  defaultValue,
  radioStyle,
  ...props
}: TRadioProps<T>): ReactElement {
  const theme = useContext(PlayceThemeContext);
  const color = props.radioColor || 'primary';
  const {
    field: { value, onChange: controlChange },
  } = useController({
    name,
    rules,
    control,
    defaultValue,
  });

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radioValue = (event.target as HTMLInputElement).value;
    if (onChange instanceof Function) {
      onChange(event);
    }
    controlChange(radioValue);
  };

  return (
    <ThemeProvider theme={theme as Theme}>
      <FormControl>
        <RadioGroup
          flexDirection={flexDirection}
          className={cx('radio-group', props.className)}
          onChange={onRadioChange}
          name={name}
          value={value || ''}
          sx={radioStyle}
        >
          {props.options.map(({ value: optionValue, disabled, label }, index) => {
            return (
              <FormControlLabel
                control={
                  <MUIRadio
                    size={props.size}
                    color={color}
                    value={optionValue}
                    icon={<span className={cx('icon', disabled && 'disabled-icon')} />}
                    checkedIcon={<span className={cx('icon', disabled ? 'disabled-checked-icon' : 'checked-icon')} />}
                    disabled={disabled}
                  />
                }
                value={optionValue}
                label={label}
                key={index}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  );
}

export default Radio;
