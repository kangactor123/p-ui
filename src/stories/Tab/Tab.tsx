import { TabProps as MUITabsProps, Tabs } from "@mui/material";
import React, { ReactElement } from "react";

/**
 * 작업 필요
 */

//  export type TabListProps = {
//   path?: string;
// } & TabProps;

export type TabsProps = {
  onChange?: (activeValue: string | number) => void;
  // tabList: TabListProps[];
  activeValue?: string | number;
  delayTime?: number;
} & MUITabsProps;

export interface ITabProps extends MUITabsProps {}

function Tab(props: ITabProps): ReactElement {
  return (
    <>
      <Tabs></Tabs>
    </>
  );
}

export default Tab;
