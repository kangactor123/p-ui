import React from "react";

import { ComponentMeta, Story } from "@storybook/react";
import StoryTemplate, { IProps } from "./Template";

export default {
  title: "Component/Template",
  component: StoryTemplate,
} as ComponentMeta<typeof StoryTemplate>;

const Template: Story<IProps> = (args) => <StoryTemplate {...args} />;

export const Basic = Template.bind({});
