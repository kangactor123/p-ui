import React, { useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import Tab, { TabListProps, TabsProps } from './Tab';

export default {
  title: 'Component/Tab',
  component: Tab,
} as ComponentMeta<typeof Tab>;

const Template: Story<TabsProps> = (args) => {
  const handleChange = (event: any, newValue: string) => {
    console.log(newValue);
    setActiveValue(newValue);
  };
  const handleClick = (tab: TabListProps) => {};
  const [activeValue, setActiveValue] = useState('overview');

  const [tabsProps, setTabsProps] = useState([
    {
      label: 'overview',
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
  ]);
  return (
    <div>
      <Tab
        {...args}
        value={activeValue}
        activeValue={activeValue}
        handleChange={handleChange}
        handleClick={handleClick}
        onClick={() => {}}
        textColor="primary"
        tabList={tabsProps}
      />
    </div>
  );
};

export const Basic = Template.bind({});
