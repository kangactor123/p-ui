import { TabProps as MUITabsProps } from "@mui/material";
import React, { ReactElement } from "react";

/**
 * Tab Component
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
  return <div>This is Template</div>;
}

export default Tab;
