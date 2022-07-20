import React from "react";
import Button, { ButtonProps } from "./Button";

import { ComponentMeta, Story } from "@storybook/react";

export default {
  title: "Component/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const firstTemplete: Story<ButtonProps> = (args) => {
  const { text = "first" } = args;
  return <Button text={text} {...args} />;
};

const secondTemplete: Story<ButtonProps> = (args) => {
  const { text = "second" } = args;
  return <Button text={text} {...args} />;
};

const thirdTemplete: Story<ButtonProps> = (args) => {
  const { text = "third" } = args;
  return <Button text={text} {...args} />;
};

export const First = firstTemplete.bind({});
export const Second = secondTemplete.bind({});
export const Third = thirdTemplete.bind({});
