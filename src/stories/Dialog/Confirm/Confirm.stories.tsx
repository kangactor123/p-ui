import React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import StoryConfirm, { IConfirmProps } from './Confirm';

export default {
  title: 'Component/Confirm1',
  component: StoryConfirm,
} as ComponentMeta<typeof StoryConfirm>;

const Confirm: Story<IConfirmProps> = (args) => {
  const handleOk = () => {};
  const handleClose = () => {};
  return (
    <div>
      <StoryConfirm
        open
        title={'Create Project'}
        onOk={handleOk}
        onCancel={handleClose}
        size="small"
        isOkButton
        isCloseIcon
        okLabel={'Ok'}
        cancelLabel={'Cancel'}
      >
        <li>PlayceMigrator_Project Name_01_spring-boot-samplespring-boot-samplespring_202212201919.jar (15.12 MB)</li>
        <li>PlayceMigrator_Project Name_01_spring-boot-samplespring-boot-samplespring_202212201919.jar (15.12 MB)</li>
      </StoryConfirm>
    </div>
  );
};

export const confirm = Confirm.bind({});
