import { AccordionSummaryProps, AccordionProps, AccordionDetailsProps } from '@mui/material';

export interface IAccordionProps extends Omit<AccordionProps, 'onChange'> {
  summaryProps: AccordionSummaryProps & {
    iconPosition?: 'start' | 'end' | 'right';
    useEdgeEndIcon?: boolean;
  };
  name: string | number;
  detailsProps?: AccordionDetailsProps;
  onChange?: (name: string | number, expanded: boolean) => void;
}

export interface IExpanded {
  [key: string]: boolean;
}
