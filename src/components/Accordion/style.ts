import styled, { StyledComponent } from '@emotion/styled';
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
} from '@mui/material';

export const AccordionPanel = styled(MuiAccordion)({});

export const AccordionSummary: StyledComponent<AccordionSummaryProps, {}, {}> = styled(MuiAccordionSummary)({
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(360deg)',
  },
});

export const AccordionDetails = styled(MuiAccordionDetails)({});

export const AccordionTitle = styled.span`
  margin: auto 0;
  color: #202020;
  font-size: 16px;
  font-weight: 500;
`;
