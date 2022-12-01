import React, { ReactElement, useContext } from 'react';
import { Theme, ThemeProvider, Tooltip as MUITooltip, TooltipProps } from '@mui/material';
import { PlayceThemeContext } from '../../providers';

function Tooltip(props: TooltipProps): ReactElement {
  const theme = useContext(PlayceThemeContext);
  return (
    <ThemeProvider theme={theme as Theme}>
      <MUITooltip arrow={true} {...props} />
    </ThemeProvider>
  );
}

export default Tooltip;
