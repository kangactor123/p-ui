import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StorySearchTooltip, { ISearchTooltipProps } from './SearchTooltip';

export default {
  title: 'Component/SearchTooltip',
  component: StorySearchTooltip,
} as ComponentMeta<typeof StorySearchTooltip>;

const SearchTooltip: Story<ISearchTooltipProps> = (args) => <StorySearchTooltip {...args} />;

export const Basic = SearchTooltip.bind({});

Basic.args = {
  tooltip: 'tooltip',
  placement: 'top',
};
