import React, { ReactElement, useContext } from 'react';
import { Theme, ThemeProvider, Tooltip as MUITooltip, TooltipProps } from '@mui/material';
import { PlayceThemeContext } from '../../providers';

interface ITooltipProps extends TooltipProps {
  title: string | false;
}

/**
 * @param param title 값이 비어있거나 false 일 경우 툴팁이 나오지 않습니다.
 */
function Tooltip({ arrow = true, title, ...props }: ITooltipProps): ReactElement {
  const theme = useContext(PlayceThemeContext);
  const tooltipTitle = title || '';
  return (
    <ThemeProvider theme={theme as Theme}>
      <MUITooltip {...props} arrow={arrow} title={tooltipTitle} />
    </ThemeProvider>
  );
}

export default Tooltip;
