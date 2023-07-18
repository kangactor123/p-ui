import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryDropdown, { IDropdownProps, IOptionsType } from './Dropdown';
import { IconMoreBlueGray } from '../icons';

export default {
  title: 'Component/Dropdown',
  component: StoryDropdown,
} as ComponentMeta<typeof StoryDropdown>;

const options: IOptionsType[] = [
  { label: 'Documentation', key: 'documentation' },
  { label: 'Download User Guide', key: 'downloadUserGuide', split: true },
  { label: 'Support Center', key: 'supportCenter', split: true },
  { label: 'Subscriptions', key: 'subscriptions', split: true },
  { label: 'About Playce Migrator', key: 'about', disabled: true },
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
  <div style={{ height: '200vh' }}>
    <StoryDropdown
      {...args}
      title={'Action'}
      options={options}
      buttonProps={{
        startIcon: <IconMoreBlueGray />,
      }}
      onClickOption={handleUserDropDownClick}
      header={'Title'}
      useScroll
    />
  </div>
);

export const StandardDropdownStory = StandardDropdown.bind({});
export const IconButtonDropdownStory = IconButtonDropdown.bind({});
