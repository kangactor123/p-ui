import React, { ReactElement, useCallback } from 'react';
import { Tabs as MuiTabs, Tab as MuiTab, TabsProps, TabProps } from '@mui/material';
import styled from '@emotion/styled';

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
    <MuiTabs value={value} onChange={handleChange} {...props}>
      {tabList.map((tab) => (
        <Tab key={tab.value} {...tab} />
      ))}
    </MuiTabs>
  );
}

export default Tabs;
