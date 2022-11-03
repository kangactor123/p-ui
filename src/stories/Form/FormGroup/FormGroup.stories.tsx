import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryFormGroup, { IFormGroupProps } from './FormGroup';

export default {
  title: 'Component/FormGroup',
  component: StoryFormGroup,
} as ComponentMeta<typeof StoryFormGroup>;

const FormGroup: Story<IFormGroupProps> = (args) => <StoryFormGroup {...args} />;

export const Basic = FormGroup.bind({});
