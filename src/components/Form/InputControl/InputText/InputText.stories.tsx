import React, { useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInputText, { TInputTextProps } from './InputText';
import { Size } from '../../../../common/enum';
import { css } from '@emotion/react';

export default {
  title: 'Component/InputText',
  component: StoryInputText,
} as ComponentMeta<typeof StoryInputText>;

export type TSampleFormControl = {
  sample: string;
};

const InputText: Story<TInputTextProps> = (args) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 300px;
      `}
    >
      <StoryInputText
        {...args}
        value={value}
        size={Size.S}
        onChange={(e) => handleChange}
        placeholder="small size Input"
      />
      <StoryInputText
        {...args}
        value={value}
        size={Size.M}
        onChange={(e) => handleChange}
        placeholder="medium size Input"
        disabled={true}
      />
    </div>
  );
};

export const Basic = InputText.bind({});

Basic.args = {
  placeholder: 'this is placeholder',
  size: Size.S,
  disabled: false,
  useClearBtn: false,
};
