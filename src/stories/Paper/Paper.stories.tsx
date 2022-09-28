import React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import StoryPaper, { TPaperProps } from './Paper';

export default {
  title: 'Component/Paper',
  component: StoryPaper,
} as ComponentMeta<typeof StoryPaper>;

const Paper: Story<TPaperProps> = (args) => <StoryPaper {...args} />;

const PaperWithChildren: Story<TPaperProps> = (args) => {
  return (
    <StoryPaper>
      <div>this is sample paper Test</div>
    </StoryPaper>
  );
};

export const Basic = Paper.bind({});
export const PaperWithChildrenStory = PaperWithChildren.bind({});
