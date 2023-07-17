import React from "react";

import { ComponentMeta, Story } from "@storybook/react";
import AntSwitch, { IAntSwitchProps } from "./AntSwitch";

export default {
  title: "Component/AntSwitch",
  component: AntSwitch,
} as ComponentMeta<typeof AntSwitch>;

const Template: Story<IAntSwitchProps> = (args) => <AntSwitch {...args} />;

export const Basic = Template.bind({});
