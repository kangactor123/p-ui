import React, { ReactElement, ReactNode } from "react";
import {
  Orientation,
  StepConnector,
  StepIconProps,
  styled as MUIStyled,
  Stepper as MUIStepper,
  Step,
  StepLabel as MUIStepLabel,
} from "@mui/material";
import { IconStepperComplete } from "../../common/icons";
import styled from "@emotion/styled";

/**
 * Template Component
 */

const IconBox = styled.div`
  padding: 8px 7px 7px 8px;
  color: #ffffff;
  font-size: 12.8px;
  font-weight: 900;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;

const ActiveBox = styled(IconBox)`
  background-color: #4285f4;
`;

const NormalBox = styled(IconBox)`
  background-color: #bec5d3;
`;

const StepLabel = styled(MUIStepLabel)`
  cursor: pointer;
`;

const QontoConnector = MUIStyled(StepConnector)({
  "& .MuiStepConnector-active": {
    borderColor: "#4285f4",
  },
  "& .Mui-completed": {
    borderColor: "#4285f4",
  },
  "& .MuiStepConnector-line": {
    borderColor: "#bec5d3",
    borderTopWidth: 2,
  },
});

function QontoStepIcon(props: StepIconProps, completedSet: Set<number>) {
  const { active, icon } = props;

  return completedSet.has((icon as number) - 1) ? (
    <IconStepperComplete />
  ) : active ? (
    <ActiveBox>0{icon}</ActiveBox>
  ) : (
    <NormalBox>0{icon}</NormalBox>
  );
}

export interface IStepperProps {
  orientation?: Orientation;
  activeStep?: number;
  steps: {
    value: ReactNode;
    title?: string;
    disabled?: boolean;
  }[];
  completed: Set<number>;
  handleStep: (idx: number) => () => void;
}

function Stepper({
  handleStep,
  activeStep,
  completed,
  steps,
  orientation = "vertical",
  ...props
}: IStepperProps): ReactElement {
  return (
    <MUIStepper
      connector={<QontoConnector />}
      activeStep={activeStep}
      orientation={orientation}
    >
      {steps.map(({ title, value }, index) => (
        <Step key={index}>
          <StepLabel
            // disabled={disabled}
            StepIconComponent={(props) => QontoStepIcon(props, completed)}
            onClick={handleStep(index)}
          >
            {title || value + ""}
          </StepLabel>
        </Step>
      ))}
    </MUIStepper>
  );
}

export default Stepper;
