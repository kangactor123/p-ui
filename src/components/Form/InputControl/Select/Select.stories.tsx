import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StorySelect, { ISelectProps } from './Select';
import { css } from '@emotion/react';
import { Size } from '../../../../common/enum';

export default {
  title: 'Component/Select',
  component: StorySelect,
} as ComponentMeta<typeof StorySelect>;

const tempOptions = [
  { label: 'first', value: 'first' },
  { label: 'second', value: 'second', disabled: true },
  { label: 'third', value: 'third' },
  { label: 'fourth', value: 'fourth' },
];

const Select: Story<ISelectProps> = (args) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 300px;
    `}
  >
    <StorySelect
      {...args}
      options={tempOptions}
      size={Size.S}
      renderValue={(value) => {
        const renderValue = tempOptions.find((option) => option.label === (value as string))?.label;
        return value ? renderValue : 'Small select';
      }}
    />
    <StorySelect
      options={tempOptions}
      size={Size.M}
      disabled={true}
      renderValue={(value) => 'Medium select disabled'}
    />
    <StorySelect
      {...args}
      options={tempOptions}
      size={Size.S}
      loading={true}
      renderValue={(value) => 'Small select loading...'}
    />
  </div>
);

const descSelectOptions = [
  {
    label: 'Administrator',
    value: 'first',
    description: 'Grants access to all resources and features.',
  },
  { label: 'Read-Only', value: 'second', description: 'Grants read-only to all resources.' },
];

const DescSelect: Story<ISelectProps> = (args) => {
  return (
    <StorySelect
      {...args}
      options={descSelectOptions}
      size={Size.S}
      placeholder={'Select a role'}
      renderValue={(value) => {
        const renderValue = descSelectOptions.find(
          (option) => option.value === (value as string),
        )?.label;
        return value ? renderValue : 'Select a Role';
      }}
    />
  );
};

export const Basic = Select.bind({});
export const DescriptionSelect = DescSelect.bind({});

Basic.args = {
  size: Size.S,
};
