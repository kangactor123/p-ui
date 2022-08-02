import React, { PropsWithChildren } from "react";

import { ComponentMeta, Story } from "@storybook/react";
import Table, { ITableProps } from "./Table";

export default {
  title: "Component/Table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: Story<ITableProps> = (args) => <Table {...args} />;

export const Basic = Template.bind({});
