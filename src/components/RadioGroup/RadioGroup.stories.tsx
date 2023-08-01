import React, { useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryRadioGroup, { RadioGroupProps } from './RadioGroup';
import { css } from '@emotion/react';

export default {
  title: 'Component/RadioGroup',
  component: StoryRadioGroup,
} as ComponentMeta<typeof StoryRadioGroup>;

const RadioGroupTemplate: Story<RadioGroupProps> = (args) => {
  return (
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
};

export const Basic = RadioGroupTemplate.bind({});

Basic.args = {
  defaultValue: 'a',
  options: [
    { label: 'a', value: 'a' },
    { label: 'b', value: 'b' },
    { label: 'c', value: 'c' },
    { label: 'd', value: 'd' },
    { label: 'e', value: 'e' },
  ],
};

const BooleanRadioGroupTemplate: Story<RadioGroupProps<boolean>> = (args) => {
  const handleChange = (value: boolean) => {
    console.log(value);
  };

  return (
    <div
      css={css`
        width: 150px;
        .playce-radio-group {
          justify-content: space-between;
        }
      `}
    >
      <StoryRadioGroup<boolean> {...args} onChange={handleChange} />
    </div>
  );
};

export const BooleanRadio = BooleanRadioGroupTemplate.bind({});

BooleanRadio.args = {
  defaultValue: true,
  useBooleanVal: true,
  options: [
    { label: 'true', value: true },
    { label: 'false', value: false },
  ],
};
