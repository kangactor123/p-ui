import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryFormGroup, { IFormGroupProps } from './FormGroup';
import FormRow from '../FormRow/FormRow';

export default {
  title: 'Component/FormGroup',
  component: StoryFormGroup,
} as ComponentMeta<typeof StoryFormGroup>;

const FormGroup: Story<IFormGroupProps> = (args) => {
  return (
    <StoryFormGroup title="this is title">
      <FormRow label="label" required>
        this is sample
      </FormRow>
    </StoryFormGroup>
  );
};

export const Basic = FormGroup.bind({});
