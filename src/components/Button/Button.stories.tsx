import React from 'react';
import Button, { TButtonProps } from './Button';
import { ComponentMeta, Story } from '@storybook/react';
import { css } from '@emotion/react';
import { DropdownDownIcon, DuplicateCopyIcon } from '../icons';

export default {
  title: 'Component/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const ButtonTemplate: Story<TButtonProps> = (args) => {
  return (
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
        <Button {...args} size={'medium'}>
          Medium
        </Button>
        <Button {...args} size={'medium'} disabled>
          Disabled
        </Button>
        <Button {...args} size={'medium'} endIcon={<DropdownDownIcon />}>
          Icon
        </Button>
        <Button {...args} size={'medium'} startIcon={<DropdownDownIcon />}>
          Icon
        </Button>
        <Button {...args} size={'medium'} onlyIcon>
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
        <Button {...args} size={'small'}>
          Small
        </Button>
        <Button {...args} size={'small'} disabled>
          Disabled
        </Button>
        <Button {...args} size={'small'} endIcon={<DuplicateCopyIcon />}>
          Icon
        </Button>
        <Button {...args} size={'small'} startIcon={<DuplicateCopyIcon />}>
          Icon
        </Button>
        <Button {...args} size={'small'} onlyIcon>
          <DuplicateCopyIcon />
        </Button>
      </div>
    </div>
  );
};

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
