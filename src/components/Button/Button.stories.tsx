import React from 'react';
import Button, { TButtonProps } from './Button';
import { ComponentMeta, Story } from '@storybook/react';
import { css } from '@emotion/react';
import { DropdownDownIcon, DuplicateCopyIcon } from '../icons';
import { Size } from '../../common/enum';

export default {
  title: 'Component/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const ButtonTemplate: Story<TButtonProps> = (args) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      gap: 10px;
    `}
  >
    <div
      css={css`
        display: flex;
        gap: 10px;
        align-items: center;
      `}
    >
      <Button {...args} size={Size.M}>
        Medium
      </Button>
      <Button {...args} size={Size.M} disabled>
        Disabled
      </Button>
      <Button {...args} size={Size.M} endIcon={<DropdownDownIcon />}>
        Icon
      </Button>
      <Button {...args} size={Size.M} startIcon={<DropdownDownIcon />}>
        Icon
      </Button>
      <Button {...args} size={Size.M} onlyIcon>
        <DropdownDownIcon />
      </Button>
    </div>
    <div
      css={css`
        display: flex;
        gap: 10px;
        align-items: center;
      `}
    >
      <Button {...args} size={Size.S}>
        Small
      </Button>
      <Button {...args} size={Size.S} disabled>
        Disabled
      </Button>
      <Button {...args} size={Size.S} endIcon={<DuplicateCopyIcon />}>
        Icon
      </Button>
      <Button {...args} size={Size.S} startIcon={<DuplicateCopyIcon />}>
        Icon
      </Button>
      <Button {...args} size={Size.S} onlyIcon>
        <DuplicateCopyIcon />
      </Button>
    </div>
  </div>
);

// contained primary
export const ContainedPrimary = ButtonTemplate.bind({});
ContainedPrimary.args = {
  variant: 'contained',
  color: 'primary',
};

// contained secondary
export const ContainedSecondary = ButtonTemplate.bind({});
ContainedSecondary.args = {
  variant: 'contained',
  color: 'secondary',
};

// contained grey
export const ContainedGrey = ButtonTemplate.bind({});
ContainedGrey.args = {
  variant: 'contained',
  color: 'grey',
};

// contained warning
export const ContainedWarning = ButtonTemplate.bind({});
ContainedWarning.args = {
  variant: 'contained',
  color: 'warning',
};

// outlined primary
export const OutlinedPrimary = ButtonTemplate.bind({});
OutlinedPrimary.args = {
  variant: 'outlined',
  color: 'primary',
};

// outlined white
export const OutlinedWhite = ButtonTemplate.bind({});
OutlinedWhite.args = {
  variant: 'outlined',
  color: 'white',
};

// text primary
export const TextPrimary = ButtonTemplate.bind({});
TextPrimary.args = {
  variant: 'text',
  color: 'primary',
};

// text primary
export const TextSecondary = ButtonTemplate.bind({});
TextSecondary.args = {
  variant: 'text',
  color: 'secondary',
};
