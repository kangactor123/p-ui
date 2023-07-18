import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import { TooltipProps } from '@mui/material';
import Tooltip from './Tooltip';

export default {
  title: 'Component/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const TooltipTemplate: Story<TooltipProps> = (args) => (
  <Tooltip {...args} title={'test'} arrow>
    <span>test</span>
  </Tooltip>
);

export const Basic = TooltipTemplate.bind({});
