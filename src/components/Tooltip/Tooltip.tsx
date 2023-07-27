import React, { ReactElement } from 'react';
import { Tooltip as MUITooltip, TooltipProps } from '@mui/material';
import { ThemeProvider } from '../../providers';

interface ITooltipProps extends TooltipProps {}

/**
 * @param param title 값이 비어있거나 false 일 경우 툴팁이 나오지 않습니다.
 */
function Tooltip({ arrow = true, title = '', ...props }: ITooltipProps): ReactElement {
  return (
    <ThemeProvider>
      <MUITooltip {...props} arrow={arrow} title={title} />
    </ThemeProvider>
  );
}

export default Tooltip;
