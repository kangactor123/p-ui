import React, { ReactElement, ReactNode, useContext } from 'react';
import {
  Orientation,
  StepConnector,
  StepIconProps,
  styled as MUIStyled,
  Stepper as MUIStepper,
  Step,
  StepLabel as MUIStepLabel,
} from '@mui/material';
import styled from '@emotion/styled';
import { createTheme } from '@mui/system';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

/**
 * 작업 필요
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
  '& .MuiStepConnector-active': {
    borderColor: '#4285f4',
  },
  '& .Mui-completed': {
    borderColor: '#4285f4',
  },
  '& .MuiStepConnector-line': {
    borderColor: '#bec5d3',
    borderTopWidth: 2,
  },
});

const stepperTheme = createTheme({
  components: {
    MUIStepper: {
      StepConnector: {
        vertical: {
          marginLeft: '9px',
          margin: '-2px 0px -3px 0px',
          padding: '0px',
        },
        lineVertical: {
          minHeight: '35px',
          borderLeftWidth: '2px',
        },
      },
    },
  },
});

function QontoStepIcon(props: StepIconProps, completedSet: Set<number>) {
  const { active, icon } = props;

  return completedSet.has((icon as number) - 1) ? (
    // <IconStepperComplete />
    <></>
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

export function Stepper({
  handleStep,
  activeStep,
  completed,
  steps,
  orientation = 'vertical',
  ...props
}: IStepperProps): ReactElement {
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <MUIStepper connector={<QontoConnector />} activeStep={activeStep} orientation={orientation}>
        {steps.map(({ title, value }, index) => (
          <Step key={index}>
            <StepLabel
              // disabled={disabled}
              StepIconComponent={(props) => QontoStepIcon(props, completed)}
              onClick={handleStep(index)}
            >
              {title || value + ''}
            </StepLabel>
          </Step>
        ))}
      </MUIStepper>
    </ThemeProvider>
  );
}

export default Stepper;
