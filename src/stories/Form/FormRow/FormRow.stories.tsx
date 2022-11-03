import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryFormRow, { IFormRowProps } from './FormRow';

export default {
  title: 'Component/FormRow',
  component: StoryFormRow,
} as ComponentMeta<typeof StoryFormRow>;

const FormRow: Story<IFormRowProps> = (args) => {
  return (
    <StoryFormRow label={'this is sample'} required>
      input
    </StoryFormRow>
  );
};

export const Basic = FormRow.bind({});
