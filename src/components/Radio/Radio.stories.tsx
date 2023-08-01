import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryRadio, { IRadioProps } from './Radio';
import { css } from '@emotion/react';

export default {
  title: 'Component/Radio',
  component: StoryRadio,
} as ComponentMeta<typeof StoryRadio>;

const RadioTemplate: Story<IRadioProps> = (args) => (
  <div
    css={css`
      display: flex;
      gap: 20px;
    `}
  >
    <StoryRadio {...args} />
    <StoryRadio {...args} label="label" value="label" />
    <StoryRadio {...args} label="checked" value="checked" checked={true} />
    <StoryRadio {...args} label="disabled" disabled={true} />
    <StoryRadio
      {...args}
      label="checked-disabled"
      value="checked-disabled"
      checked={true}
      disabled={true}
    />
  </div>
);

export const Radio = RadioTemplate.bind({});
