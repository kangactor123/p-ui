import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryTranslation, { ITranslationProps } from './Translation';

export default {
  title: 'Component/Translation',
  component: StoryTranslation,
} as ComponentMeta<typeof StoryTranslation>;

const Translation: Story<ITranslationProps> = (args) => <StoryTranslation {...args} />;

export const Basic = Translation.bind({});
