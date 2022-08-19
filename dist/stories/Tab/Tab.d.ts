import { TabProps, TabsProps as MUITabsProps } from '@mui/material';
import React, { ReactElement } from 'react';
export declare type TabListProps = {
    path?: string;
} & TabProps;
export declare type TabsProps = {
    tabList: TabListProps[];
    activeValue?: string | number;
    delayTime?: number;
    onChange?: (activeValue: string | number) => void;
    handleClick: (tab: TabListProps) => void;
    handleChange: (event: React.ChangeEvent<{}>, newValue: string) => void;
} & MUITabsProps;
declare function Tab({ tabList, activeValue, delayTime, onChange, handleChange, handleClick, ...props }: TabsProps): ReactElement;
declare namespace Tab {
    var defaultProps: {
        indicatorColor: string;
    };
}
export default Tab;
