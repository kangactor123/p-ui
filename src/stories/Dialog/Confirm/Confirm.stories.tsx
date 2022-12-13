import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryConfirm, { IConfirmProps } from './Confirm';

export default {
  title: 'Component/Confirm',
  component: StoryConfirm,
} as ComponentMeta<typeof StoryConfirm>;

const Confirm: Story<IConfirmProps> = (args) => {
  return (
    <Confirm
      open
      title={'title'}
      onOk={() => {}}
      onCancel={() => {}}
      size="large"
      isOkButton
      isCloseIcon
      okLabel={'Ok'}
      cancelLabel={'Cancel'}
    >
      <div>this is sample Confirm component</div>
    </Confirm>
  );
};
