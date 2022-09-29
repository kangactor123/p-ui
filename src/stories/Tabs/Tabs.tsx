import React, { ReactElement, useCallback } from 'react';
import { Tabs as MuiTabs, Tab as MuiTab, TabsProps, TabProps, ThemeProvider } from '@mui/material';
import styled from '@emotion/styled';
import { tabsTheme } from './Tabs.style';

export interface ITabListProps extends TabProps {
  path?: string;
}

export interface ITabsProps extends TabsProps {
  tabList: ITabListProps[];
}

const Tab = styled(MuiTab)(`
  text-transform: none;
`);

function Tabs({ tabList, value, onChange, ...props }: ITabsProps): ReactElement {
  const handleChange = useCallback(
    (event: React.SyntheticEvent, value: any) => {
      if (onChange instanceof Function) {
        onChange(event, value);
      }
    },
    [onChange],
  );

  return (
    // <ThemeProvider theme={tabsTheme}>
    <MuiTabs value={value} onChange={handleChange} {...props}>
      {tabList.map((tab) => (
        <Tab key={tab.value} {...tab} />
      ))}
    </MuiTabs>
    // </ThemeProvider>
  );
}

export default Tabs;
