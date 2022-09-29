import React, { useCallback, useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import Tabs, { ITabsProps } from './Tabs';

export default {
  title: 'Component/Tab',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const tabList = [
  {
    label: 'Details',
    value: 'overview',
  },
  {
    label: 'Middlewares',
    value: 'middlewares',
  },
  {
    label: 'Applications',
    value: 'applications',
  },
  {
    label: 'Databases',
    value: 'databases',
  },
  {
    label: 'Preconfiguration',
    value: 'preconfig',
  },
];

const Template: Story<ITabsProps> = (args) => {
  const [activeTab, setActiveTab] = useState(tabList[0].value);
  const handleChange = useCallback((event: React.SyntheticEvent, value: string) => {
    setActiveTab(value);
  }, []);

  return <Tabs {...args} onChange={handleChange} value={activeTab} textColor="primary" tabList={tabList} />;
};

export const Basic = Template.bind({});
