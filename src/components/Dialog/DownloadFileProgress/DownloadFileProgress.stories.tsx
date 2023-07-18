import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryDownloadFileProgress, { IDownloadFileProgressProps, DownloadStatus } from './DownloadFileProgress';

export default {
  title: 'Component/DownloadFileProgress',
  component: StoryDownloadFileProgress,
} as ComponentMeta<typeof StoryDownloadFileProgress>;

const DownloadFileProgress: Story<IDownloadFileProgressProps> = (args) => {
  return <StoryDownloadFileProgress {...args} onCancel={() => {}} />;
};

export const Basic = DownloadFileProgress.bind({});

Basic.args = {
  isOpened: true,
  progressInfo: {
    percentage: 10,
    loaded: 100,
    status: DownloadStatus.FAILED,
  },
  fileName: `test.csv`,
  errorMessage: 'error',
};
