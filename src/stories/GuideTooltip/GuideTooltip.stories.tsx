import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryGuideTooltip, { IGuideTooltipProps } from './GuideTooltip';

export default {
  title: 'Component/GuideTooltip',
  component: StoryGuideTooltip,
} as ComponentMeta<typeof StoryGuideTooltip>;

const GuideTooltip: Story<IGuideTooltipProps> = (args) => <StoryGuideTooltip {...args} />;

export const Basic = GuideTooltip.bind({});
