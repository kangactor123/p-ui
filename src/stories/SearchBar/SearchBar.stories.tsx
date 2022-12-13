import React, { useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StorySearchBar, { TSearchInputProps } from './SearchBar';

export default {
  title: 'Component/SearchBar',
  component: StorySearchBar,
} as ComponentMeta<typeof StorySearchBar>;

const SearchBar: Story<TSearchInputProps> = (args) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleDeleteSearchKeyword = () => {
    setValue('');
  };

  return (
    <StorySearchBar
      {...args}
      placeholder={'search bar placeholder here'}
      value={value}
      onChange={handleChange}
      inputSize={'medium'}
      InputProps={{ sx: { width: '300px' } }}
      onDeleteSearchKeyword={handleDeleteSearchKeyword}
    />
  );
};

export const Basic = SearchBar.bind({});
