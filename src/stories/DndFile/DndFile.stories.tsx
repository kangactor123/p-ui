import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryDndFile, { IDndFileProps } from './DndFile';

export default {
  title: 'Component/DndFile',
  component: StoryDndFile,
} as ComponentMeta<typeof StoryDndFile>;

const DndFile: Story<IDndFileProps> = (args) => <StoryDndFile {...args} />;

export const Basic = DndFile.bind({});
