import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryValidationMessage, { IValidationMessageProps } from './ValidationMessage';

export default {
  title: 'Component/ValidationMessage',
  component: StoryValidationMessage,
} as ComponentMeta<typeof StoryValidationMessage>;

const ValidationMessage: Story<IValidationMessageProps> = (args) => <StoryValidationMessage {...args} />;

export const Basic = ValidationMessage.bind({});
