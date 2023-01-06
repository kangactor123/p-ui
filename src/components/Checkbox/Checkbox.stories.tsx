import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryCheckbox, { ICheckboxProps } from './Checkbox';
import { css } from '@emotion/react';

export default {
  title: 'Component/Checkbox',
  component: StoryCheckbox,
} as ComponentMeta<typeof StoryCheckbox>;

const CheckboxTemplate: Story<ICheckboxProps> = (args) => (
  <div
    css={css`
      display: flex;
      gap: 20px;
    `}
  >
    <StoryCheckbox />
    <StoryCheckbox label="label" />
    <StoryCheckbox label="checked" checked />
    <StoryCheckbox label="disabled" disabled />
    <StoryCheckbox label="checked-disabled" checked disabled />
    <StoryCheckbox label="tooltip" useTooltip />
    <div
      css={css`
        width: 60px;
      `}
    >
      <StoryCheckbox label="ellipsis" useEllipsis />
    </div>
  </div>
);

export const Checkbox = CheckboxTemplate.bind({});
