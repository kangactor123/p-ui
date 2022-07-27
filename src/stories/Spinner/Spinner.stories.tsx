import React from "react";

import { ComponentMeta, Story } from "@storybook/react";
import Spinner, { ISpinnerProps, SpinnerSize, SpinnerType } from "./Spinner";

export default {
  title: "Component/Spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: Story<ISpinnerProps> = (args) => <Spinner {...args} />;

const BasicTemplate: Story<ISpinnerProps> = (args) => {
  const {
    size = SpinnerSize.large,
    type = SpinnerType.bars,
    color = "black",
  } = args;
  return <Spinner size={size} color={color} type={type} {...args} />;
};

export const Basic = Template.bind({});
export const BarSpinner = BasicTemplate.bind({});
