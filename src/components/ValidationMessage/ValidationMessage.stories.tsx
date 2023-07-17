import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryValidationMessage, { IValidationMessageProps } from './ValidationMessage';

export default {
  title: 'Component/ValidationMessage',
  component: StoryValidationMessage,
} as ComponentMeta<typeof StoryValidationMessage>;

const ValidationMessage: Story<IValidationMessageProps> = (args) => (
  <>
    <StoryValidationMessage {...args} text={'this is error sample message'} isError={true} />
    <StoryValidationMessage {...args} text={'this is success sample message'} isError={false} />
  </>
);

export const Basic = ValidationMessage.bind({});
