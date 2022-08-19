import { ReactElement, ReactNode } from 'react';
import { Orientation } from '@mui/material';
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
declare function Stepper({ handleStep, activeStep, completed, steps, orientation, ...props }: IStepperProps): ReactElement;
export default Stepper;
