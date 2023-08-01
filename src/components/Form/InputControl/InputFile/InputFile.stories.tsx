import React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import StoryInputFile, { TInputFileProps } from './InputFile';
import { css } from '@emotion/react';
import { Size } from '../../../../common/enum';

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
    <StoryInputFile {...args} name={'sample'} oldFileName="chip.json" size={Size.S} />
    <StoryInputFile {...args} name={'sample'} value="C:\file.json" size={Size.M} />
    <StoryInputFile {...args} name={'sample'} placeholder="disabled" size={Size.S} />
  </div>
);
export const Basic = InputFile.bind({});
