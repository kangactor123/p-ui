import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryDefinitionList, { IDefinitionListProps, IDefinitionValue } from './DefinitionList';

export default {
  title: 'Component/DefinitionList',
  component: StoryDefinitionList,
} as ComponentMeta<typeof StoryDefinitionList>;

const value: IDefinitionValue[] = [
  {
    title: 'Added Date',
    description: '2022-09-28 15:04',
    hidden: false,
    copyProps: {
      disabled: false,
      value: 'hello world',
    },
  },
  {
    title: 'Added By',
    description: 'admin',
  },
  {
    title: 'Last Updated Date',
    description: '2022-09-28 15:04',
  },
  {
    title: 'Last Updated By',
    description: 'admin',
  },
  {
    title: 'Description',
    description: 'dsf',
  },
  {
    title: '',
    description: '',
  },
];

const DefinitionList: Story<IDefinitionListProps> = (args) => <StoryDefinitionList {...args} />;

export const Basic = DefinitionList.bind({});

Basic.args = {
  value: value,
  type: 'multi',
};
