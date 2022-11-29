import { ButtonProps } from '@mui/material';

export interface IAccordionAction<T> {
  expanded: T;
  setExpanded: React.Dispatch<React.SetStateAction<T>>;
  buttonProps?: ButtonProps;
  iconPosition?: 'start' | 'end';
}
