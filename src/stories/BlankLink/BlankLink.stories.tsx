import React from "react";

import { ComponentMeta, Story } from "@storybook/react";
import BlankLink, { IBlankLinkProps } from "./BlankLink";

export default {
  title: "Component/BlankLink",
  component: BlankLink,
} as ComponentMeta<typeof BlankLink>;

const Template: Story<IBlankLinkProps> = (args) => <BlankLink {...args} />;

export const Basic = Template.bind({});
