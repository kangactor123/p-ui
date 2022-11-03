import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StorySelect, { ISelectProps } from './Select';

export default {
  title: 'Component/Select',
  component: StorySelect,
} as ComponentMeta<typeof StorySelect>;

const Select: Story<ISelectProps> = (args) => <StorySelect {...args} />;

export const Basic = Select.bind({});
