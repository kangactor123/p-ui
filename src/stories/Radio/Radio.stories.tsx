import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryRadio, { IRadioProps } from './Radio';

export default {
  title: 'Component/Radio',
  component: StoryRadio,
} as ComponentMeta<typeof StoryRadio>;

const radioStyle = {
  '&.MuiRadio-root': {
    margin: '0 8px 0 9px',
    padding: 0,

    '.icon': {
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      boxShadow: 'inset 0 0 0 1px #c3c6d4, inset 0 -1px 0 #c3c6d4',
      backgroundColor: 'transparent',
      '&::before': {
        content: '""',
        display: 'block',
        width: '16px',
        height: '16px',
        backgroundImage: 'radial-gradient(#fff, #fff 33%, transparent 33%)',
      },
    },

    '.checked-icon': {
      backgroundColor: '#0073ea',
      boxShadow: 'inset 0 0 0 1px #0073ea, inset 0 -1px 0 #0073ea',
    },

    '.disabled-icon': {
      opacity: '0.4',
      backgroundColor: '#e6e9ef',
      boxShadow: 'inset 0 0 0 1px #e6e9ef, inset 0 -1px 0 #e6e9ef',
      '&::before': {
        backgroundImage: 'radial-gradient(#e6e9ef, #e6e9ef 3%, transparent 33%)',
      },
    },

    '.disabled-checked-icon': {
      backgroundColor: '#e6e9ef',
      boxShadow: 'inset 0 0 0 1px #e6e9ef, inset 0 -1px 0 #e6e9ef',
      '&::before': {
        backgroundImage:
          // eslint-disable-next-line max-len
          'radial-gradient(rgba(50, 51, 56, 0.38), rgba(50, 51, 56, 0.38) 33%, transparent 33%)',
      },
    },

    '&:hover': {
      '& .icon': {
        boxShadow: 'inset 0 0 0 1px #323338, inset 0 -1px 0 #323338',
      },
      '& .checked-icon': {
        backgroundColor: '#0060B9',
        boxShadow: 'inset 0 0 0 1px #0060B9, inset 0 -1px 0 #0060B9',
      },
    },
  },
};

const Radio: Story<IRadioProps> = (args) => <StoryRadio {...args} />;

export const Basic = Radio.bind({});

Basic.args = {
  value: '1',
  label: '1',
  disabled: false,
  checked: true,
  sx: radioStyle,
};
