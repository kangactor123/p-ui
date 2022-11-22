import styled, { StyledComponent } from '@emotion/styled';
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
} from '@mui/material';

export const AccordionPanel = styled(MuiAccordion)({
  marginBottom: '16px',
});

export const AccordionSummary: StyledComponent<AccordionSummaryProps, {}, {}> = styled(MuiAccordionSummary)({
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(360deg)',
  },
  padding: '0 26px',
});
export const AccordionDetails = styled(MuiAccordionDetails)({
  padding: '8px 32px 36px',
});

export const AccordionTitle = styled.h3`
  margin: auto 0;
`;
