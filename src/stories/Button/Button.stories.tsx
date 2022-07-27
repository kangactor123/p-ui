import React from "react";
import Button, { ButtonProps } from "./Button";

import { ComponentMeta, Story } from "@storybook/react";

export default {
  title: "Component/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const firstTemplete: Story<ButtonProps> = (args) => {
  const { text = "first" } = args;
  return <Button {...args} text={text} />;
};

const secondTemplete: Story<ButtonProps> = (args) => {
  const { text = "second" } = args;
  return <Button {...args} text={text} />;
};

const thirdTemplete: Story<ButtonProps> = (args) => {
  const { text = "third" } = args;
  return <Button {...args} text={text} />;
};

export const First = firstTemplete.bind({});
export const Second = secondTemplete.bind({});
export const Third = thirdTemplete.bind({});
