import React, { useCallback, useMemo, useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryToggleButton, { IToggleButtonProps } from './ToggleButton';
import { IOptionsType } from '../Dropdown';

export default {
  title: 'Component/ToggleButton',
  component: StoryToggleButton,
} as ComponentMeta<typeof StoryToggleButton>;

const ToggleButton: Story<IToggleButtonProps> = (args) => {
  const [splitView, setSplitView] = useState<string>('split');

  const diffViewerOption: IOptionsType[] = useMemo(
    () => [
      { key: 'split', label: 'Split' },
      { key: 'unified', label: 'Unified' },
    ],
    [],
  );

  const onChangeViewerOption = useCallback((e: React.MouseEvent<HTMLElement>, key: string) => {
    if (key.length) {
      setSplitView(key);
    }
  }, []);

  return (
    <StoryToggleButton
      {...args}
      options={diffViewerOption}
      groupProps={{ value: splitView, onChange: onChangeViewerOption, exclusive: true }}
    />
  );
};

export const Basic = ToggleButton.bind({});
