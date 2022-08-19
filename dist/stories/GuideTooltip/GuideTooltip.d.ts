import { TooltipProps } from '@mui/material';
import React, { ReactElement } from 'react';
export interface IGuideTooltipProps extends Omit<TooltipProps, 'children'> {
    size?: number | string;
    iconProps?: React.SVGProps<SVGSVGElement> & {
        title?: string;
    };
}
declare function GuideTooltip({ size, ...tooltipProps }: IGuideTooltipProps): ReactElement;
export default GuideTooltip;
