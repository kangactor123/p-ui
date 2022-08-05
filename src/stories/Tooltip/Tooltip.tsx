import React, { ReactElement } from 'react';
import { Tooltip as MUITooltip, TooltipProps } from '@mui/material';

function Tooltip(props: TooltipProps): ReactElement {
  return <MUITooltip {...props} />;
}

export default Tooltip;
