import React, { ReactElement, useContext } from 'react';
import {
  ToggleButtonGroup,
  ToggleButton as MUIToggleButton,
  ToggleButtonGroupProps,
  ToggleButtonProps,
  ThemeProvider,
  Theme,
} from '@mui/material';
import { IOptionsType } from '../Dropdown';
import { PlayceThemeContext } from '../../providers';

export interface IToggleButtonProps {
  options: IOptionsType[];
  groupProps?: ToggleButtonGroupProps;
  buttonProps?: ToggleButtonProps;
}

function ToggleButton({ options, groupProps, buttonProps }: IToggleButtonProps): ReactElement {
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme as Theme}>
      <ToggleButtonGroup {...groupProps}>
        {options.map((option: IOptionsType) => (
          <MUIToggleButton key={option.key} value={option.key} {...buttonProps}>
            {option.label}
          </MUIToggleButton>
        ))}
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}

export default ToggleButton;
