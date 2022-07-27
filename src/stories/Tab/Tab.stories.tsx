import React from "react";

import { ComponentMeta, Story } from "@storybook/react";
import Tab, { ITabProps } from "./Tab";

export default {
  title: "Component/Tab",
  component: Tab,
} as ComponentMeta<typeof Tab>;

const Template: Story<ITabProps> = (args) => <Tab {...args} />;

export const Basic = Template.bind({});
