import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryDragDrop, { IDragDropProps } from './DragDrop';

export default {
  title: 'Component/DragDrop',
  component: StoryDragDrop,
} as ComponentMeta<typeof StoryDragDrop>;

const DragDrop: Story<IDragDropProps> = (args) => <StoryDragDrop {...args} />;

// export const Basic = DragDrop.bind({});
