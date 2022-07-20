import React from "react";

import { ComponentMeta, Story } from "@storybook/react";
import Spinner, { ISpinnerProps } from "./Spinner";

export default {
  title: "Component/Spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: Story<ISpinnerProps> = (args) => <Spinner {...args} />;

export const Basic = Template.bind({});
