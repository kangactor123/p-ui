import React, { useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StorySearchBar, { TSearchInputProps } from './SearchBar';

export default {
  title: 'Component/SearchBar',
  component: StorySearchBar,
} as ComponentMeta<typeof StorySearchBar>;

const SearchBar: Story<TSearchInputProps> = (args) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <StorySearchBar
      {...args}
      placeholder={'Search'}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export const Basic = SearchBar.bind({});

Basic.args = {
  placeholder: 'this is placeholder',
};
