import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryCheckbox, { ICheckboxProps } from './Checkbox';
import checkedIcon from '../icons/svg/icon-checkbox-checked.svg';
import disabledCheckedIcon from '../icons/svg/icon-checkbox-disabled-checked.svg';

export default {
  title: 'Component/Checkbox',
  component: StoryCheckbox,
} as ComponentMeta<typeof StoryCheckbox>;

const checkboxStyle = {
  '&.MuiCheckbox-root': {
    padding: 0,
    maxWidth: '16px',
    maxHeight: '16px',
    marginRight: '7px',

    '.checkbox': {
      minWidth: '16px',
      minHeight: '16px',
      borderRadius: '2px',
    },

    '.regular-box': {
      border: '1px solid #c5c7d0',
      backgroundColor: 'transparent',
    },

    '.disabled-box': {
      backgroundColor: 'rgba(230, 233, 239, 0.4)',
    },

    '.checked-box': {
      backgroundColor: '#0073ea',
      '&::before': {
        display: 'block',
        width: '16px',
        height: '16px',
        backgroundImage: `url(${checkedIcon})`,
        content: '""',
      },
    },

    '.disabled-checked-box': {
      backgroundColor: 'rgba(230, 233, 239, 0.4)',
      '&::before': {
        display: 'block',
        width: '16px',
        height: '16px',
        backgroundImage: `url(${disabledCheckedIcon})`,
        content: '""',
      },
    },

    '&:hover': {
      '& .regular-box': {
        border: '1px solid #323338',
      },
      '& .checked-box': {
        backgroundColor: '#0060B9',
      },
    },
  },
};

const Checkbox: Story<ICheckboxProps> = (args) => <StoryCheckbox {...args} />;

export const Basic = Checkbox.bind({});

Basic.args = {
  disabled: false,
  checked: false,
  label: 'test',
  sx: checkboxStyle,
};
