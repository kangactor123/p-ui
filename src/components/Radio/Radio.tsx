import React, { ReactElement, ReactNode, useContext } from 'react';
// import { useTranslation } from 'react-i18next';
import { Radio as MUIRadio, RadioProps, ThemeProvider, Theme } from '@mui/material';
import { cx } from '@emotion/css';
import { PlayceThemeContext } from '../../providers';
import styled from '@emotion/styled';

export interface IRadioOptions {
  label?: ReactNode;
  value?: unknown;
  disabled?: boolean;
  checked?: boolean;
}

export interface IRadioProps extends IRadioOptions, RadioProps {}

const RadioWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div<{ disabled: boolean }>`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${(props) => (props.disabled ? 'rgba(50, 51, 56, 0.38)' : '#323338')};
`;

function Radio({ value, disabled = false, label, checked, color, size, ...props }: IRadioProps): ReactElement {
  // const { t } = useTranslation();
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme as Theme}>
      <RadioWrap>
        <MUIRadio
          {...props}
          size={size}
          color={color}
          value={value}
          icon={<span className={cx('icon', disabled && 'disabled-icon')} />}
          checkedIcon={<span className={cx('icon', disabled ? 'disabled-checked-icon' : 'checked-icon')} />}
          disabled={disabled}
          checked={checked}
        />
        {!!label && <Label disabled={disabled}>{label}</Label>}
      </RadioWrap>
    </ThemeProvider>
  );
}

export default Radio;
