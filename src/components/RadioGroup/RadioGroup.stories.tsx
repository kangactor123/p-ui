import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryRadioGroup, { RadioGroupProps } from './RadioGroup';
import { css } from '@emotion/react';

export default {
  title: 'Component/RadioGroup',
  component: StoryRadioGroup,
} as ComponentMeta<typeof StoryRadioGroup>;

const RadioGroupTemplate: Story<RadioGroupProps> = (args) => (
  <div
    css={css`
      width: 300px;
      .playce-radio-group {
        justify-content: space-between;
      }
    `}
  >
    <StoryRadioGroup {...args} />
  </div>
);

export const RadioGroup = RadioGroupTemplate.bind({});

RadioGroup.args = {
  defaultValue: 'a',
  options: [
    { label: 'a', value: 'a' },
    { label: 'b', value: 'b' },
    { label: 'c', value: 'c' },
    { label: 'd', value: 'd' },
    { label: 'e', value: 'e' },
  ],
};
