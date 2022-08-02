import React, { useState } from "react";

import { ComponentMeta, Story } from "@storybook/react";
import Stepper, { IStepperProps } from "./Stepper";

export default {
  title: "Component/Stepper",
  component: Stepper,
} as ComponentMeta<typeof Stepper>;

const Template: Story<IStepperProps> = (args) => {
  const completed: Set<number> = new Set();
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { value: "Step 01 : Business Factors" },
    { value: "Step 02 : Technical Factors" },
    { value: "Step 03 : Review" },
  ];
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };
  return (
    <Stepper
      {...args}
      completed={completed}
      steps={steps}
      activeStep={activeStep}
      handleStep={handleStep}
    />
  );
};

export const Basic = Template.bind({});
