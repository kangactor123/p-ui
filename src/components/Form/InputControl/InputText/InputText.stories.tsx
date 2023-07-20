import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputText, { TInputTextProps } from './InputText';
import { Size } from '../../../../common/enum';

export default {
  title: 'Component/InputText',
  component: StoryInputText,
} as ComponentMeta<typeof StoryInputText>;

export type TSampleFormControl = {
  sample: string;
};

const InputText: Story<TInputTextProps> = (args) => {
  return <StoryInputText {...args} />;
};

export const Basic = InputText.bind({});

Basic.args = {
  placeholder: 'this is placeholder',
  inputSize: Size.S,
  disabled: false,
  useClearBtn: false,
};
