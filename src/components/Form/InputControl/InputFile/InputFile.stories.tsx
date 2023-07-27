import React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import StoryInputFile, { TInputFileProps } from './InputFile';
import { css } from '@emotion/react';

export default {
  title: 'Component/InputFile',
  component: StoryInputFile,
} as ComponentMeta<typeof StoryInputFile>;

const InputFile: Story<TInputFileProps> = (args) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 300px;
    `}
  >
    <StoryInputFile {...args} name={'sample'} oldFileName="chip.json" />
    <StoryInputFile {...args} name={'sample'} value="C:\file.json" />
    <StoryInputFile {...args} name={'sample'} disabled={true} placeholder="disabled" />
  </div>
);
export const Basic = InputFile.bind({});
