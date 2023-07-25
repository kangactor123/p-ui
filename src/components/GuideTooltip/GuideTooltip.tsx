import { Tooltip, TooltipProps } from '@mui/material';
import React, { ReactElement, useContext } from 'react';
import { IconInfo } from '../icons';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

export interface IGuideTooltipProps extends Omit<TooltipProps, 'children'> {
  size?: number | string;
  iconProps?: React.SVGProps<SVGSVGElement> & { title?: string };
}

function getIconSizeStyle(
  size: IGuideTooltipProps['size'] = 18,
): Record<'width' | 'height', string> {
  const width: string = typeof size === 'number' ? `${size}px` : size;
  return { width, height: width };
}

function GuideTooltip({ size, ...tooltipProps }: IGuideTooltipProps): ReactElement {
  const { style, ...iconProps } = tooltipProps.iconProps || {};
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <Tooltip {...tooltipProps}>
        <IconInfo style={{ ...getIconSizeStyle(size), ...style }} {...iconProps} />
      </Tooltip>
    </ThemeProvider>
  );
}

export default GuideTooltip;
