import React, { ReactElement, ReactNode, useContext } from 'react';
import { CheckboxProps as MUICheckboxProps, Theme, ThemeProvider, Checkbox as MUICheckbox } from '@mui/material';
import { cx } from '@emotion/css';
import { PlayceThemeContext } from '../../providers';
import styled from '@emotion/styled';

export interface ICheckboxProps extends MUICheckboxProps {
  label?: ReactNode;
}

const CheckboxWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Label = styled.div<{ disabled: boolean }>`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: ${(props) => (props.disabled ? 'rgba(103, 104, 121, 0.4)' : '#323338')};
  overflow: hidden;
  max-width: calc(100% - 23px);
  text-overflow: ellipsis;
`;

function Checkbox({ disabled = false, label, ...props }: ICheckboxProps): ReactElement {
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme as Theme}>
      <CheckboxWrap>
        <MUICheckbox
          {...props}
          disabled={disabled}
          icon={<span className={cx('checkbox', disabled ? 'disabled-box' : 'regular-box')} />}
          checkedIcon={<span className={cx('checkbox', disabled ? 'disabled-checked-box' : 'checked-box')} />}
          disableRipple
        />
        {!!label && (
          <Label disabled={disabled} className={'checkbox-label'}>
            {label}
          </Label>
        )}
      </CheckboxWrap>
    </ThemeProvider>
  );
}

export default Checkbox;
