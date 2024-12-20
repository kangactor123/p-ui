import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryInfoBox, { InfoBoxProps, InfoStatus } from './InfoBox';

export default {
  title: 'Component/InfoBox',
  component: StoryInfoBox,
} as ComponentMeta<typeof StoryInfoBox>;

const InfoBoxTemplate: Story<InfoBoxProps> = (args) => (
  <StoryInfoBox
    {...args}
    title="Get started with project"
    content={
      <div>
        To get started with your project, download a template for uploading your inventory.
        <br />
        Fill in the template and upload the data.
        <span style={{ color: '#4285F4', cursor: 'pointer', marginLeft: '5px' }}>
          Go to Upload Inventory
        </span>
      </div>
    }
  />
);

export const Information = InfoBoxTemplate.bind({});
Information.args = {
  status: InfoStatus.Information,
};

export const Success = InfoBoxTemplate.bind({});
Success.args = {
  status: InfoStatus.Success,
};

export const Warning = InfoBoxTemplate.bind({});
Warning.args = {
  status: InfoStatus.Warning,
};

export const Error = InfoBoxTemplate.bind({});
Error.args = {
  status: InfoStatus.Error,
};
