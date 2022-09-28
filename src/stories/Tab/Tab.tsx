import { Tabs as MUITabs, TabProps, TabsProps as MUITabsProps, Tab as MUITab, ThemeProvider } from '@mui/material';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { tabsTheme } from './Tab.style';

function a11yProps(index: any) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export type TabListProps = {
  path?: string;
} & TabProps;

export type TabsProps = {
  tabList: TabListProps[];
  activeValue?: string | number;
  delayTime?: number;
  onChange?: (activeValue: string | number) => void;
  handleClick: (tab: TabListProps) => void;
  handleChange: (event: React.ChangeEvent<{}>, newValue: string) => void;
} & MUITabsProps;

Tab.defaultProps = {
  indicatorColor: 'primary',
};

function Tab({
  tabList,
  activeValue,
  delayTime,
  onChange,
  handleChange,
  handleClick,
  ...props
}: TabsProps): ReactElement {
  const defaultTabValue = useMemo(
    () => (tabList.length ? (activeValue ? activeValue : tabList[0].value) : ''),
    [tabList, activeValue],
  );
  const [value, setValue] = useState(defaultTabValue);

  useEffect(() => {
    setValue(activeValue);
  }, [activeValue]);

  return (
    <ThemeProvider theme={tabsTheme}>
      <MUITabs value={value} onChange={handleChange} {...props}>
        {tabList.map((tab) => (
          <MUITab onClick={() => handleClick(tab)} key={tab.value} {...tab} {...a11yProps(tab.value)} />
        ))}
      </MUITabs>
    </ThemeProvider>
  );
}

export default Tab;
