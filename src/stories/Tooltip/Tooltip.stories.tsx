import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import { TooltipProps } from '@mui/material';
import Tooltip from './Tooltip';

export default {
  title: 'Component/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: Story<TooltipProps> = (args) => <Tooltip {...args} />;

export const Basic = Template.bind({});
