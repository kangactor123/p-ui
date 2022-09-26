var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from '@emotion/styled';
import { Accordion as MuiAccordion, AccordionDetails as MuiAccordionDetails, AccordionSummary as MuiAccordionSummary, } from '@mui/material';
export var AccordionPanel = styled(MuiAccordion)({
    marginBottom: '16px',
});
export var AccordionSummary = styled(MuiAccordionSummary)({
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(360deg)',
    },
    padding: '0 26px',
});
export var AccordionDetails = styled(MuiAccordionDetails)({
    padding: '8px 32px 36px',
});
export var Title = styled.h3(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: auto 0;\n"], ["\n  margin: auto 0;\n"])));
var templateObject_1;
