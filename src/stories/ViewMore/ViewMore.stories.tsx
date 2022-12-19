import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryViewMore, { IViewMoreProps } from './ViewMore';
import { IOptionsType } from '../Dropdown';

export default {
  title: 'Component/ViewMore',
  component: StoryViewMore,
} as ComponentMeta<typeof StoryViewMore>;

const ViewMore: Story<IViewMoreProps> = (args) => {
  const options: IOptionsType[] = [
    {
      key: 'test',
      label: 'test',
    },
  ];

  return <StoryViewMore {...args} options={options} onClickOption={() => {}} />;
};

export const Basic = ViewMore.bind({});
