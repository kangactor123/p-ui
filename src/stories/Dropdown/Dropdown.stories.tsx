import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryDropdown, { IDropdownProps, IOptionsType } from './Dropdown';
import { IconMoreBlueGray } from '../icons';

export default {
  title: 'Component/Dropdown',
  component: StoryDropdown,
} as ComponentMeta<typeof StoryDropdown>;

const options: IOptionsType[] = [
  {
    label: 'edit',
    key: 'edit',
    disabled: true,
  },
  {
    label: 'delete',
    key: 'delete',
  },
];

const handleUserDropDownClick = (key: string) => {
  switch (key) {
    case 'edit':
      alert(key);
      break;
    case 'delete':
      alert(key);
      break;
  }
};

const IconButtonDropdown: Story<IDropdownProps> = (args) => (
  <StoryDropdown
    {...args}
    options={options}
    buttonProps={{
      startIcon: <IconMoreBlueGray />,
    }}
    isIconButton={true}
    title={<IconMoreBlueGray />}
    tooltip={'tooltip'}
    onClickOption={handleUserDropDownClick}
  />
);

const StandardDropdown: Story<IDropdownProps> = (args) => (
  <StoryDropdown
    {...args}
    title={'Action'}
    options={options}
    buttonProps={{
      startIcon: <IconMoreBlueGray />,
    }}
    onClickOption={handleUserDropDownClick}
  />
);

export const StandardDropdownStory = StandardDropdown.bind({});
export const IconButtonDropdownStory = IconButtonDropdown.bind({});
