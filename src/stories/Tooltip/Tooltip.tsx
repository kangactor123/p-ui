import React, { ReactElement, useContext } from 'react';
import { ThemeOptions, ThemeProvider, Tooltip as MUITooltip, TooltipProps } from '@mui/material';
import { PlayceThemeContext } from '../../providers';

function Tooltip(props: TooltipProps): ReactElement {
  const theme = useContext(PlayceThemeContext);
  return (
    <ThemeProvider theme={theme as ThemeOptions}>
      <MUITooltip {...props} />;
    </ThemeProvider>
  );
}

export default Tooltip;
