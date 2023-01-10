import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryDropdown, { IPopperDropdownProps } from './PopperDropdown';
import { IconMoreBlueGray } from '../icons';
import { IOptionsType } from '../Dropdown';

export default {
  title: 'Component/PopperDropdown',
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

const IconButtonDropdown: Story<IPopperDropdownProps> = (args) => (
  <StoryDropdown
    {...args}
    options={options}
    buttonProps={{
      startIcon: <IconMoreBlueGray />,
    }}
    isIconButton={true}
    title={<IconMoreBlueGray />}
    tooltip={'tooltip'}
    placement="bottom-start"
    onClickOption={handleUserDropDownClick}
  />
);

const StandardDropdown: Story<IPopperDropdownProps> = (args) => (
  <div>
    <StoryDropdown
      {...args}
      title={'Action'}
      options={options}
      buttonProps={{
        startIcon: <IconMoreBlueGray />,
      }}
      placement="bottom-start"
      onClickOption={handleUserDropDownClick}
      header={'Title'}
    />
  </div>
);

export const StandardDropdownStory = StandardDropdown.bind({});
export const IconButtonDropdownStory = IconButtonDropdown.bind({});
