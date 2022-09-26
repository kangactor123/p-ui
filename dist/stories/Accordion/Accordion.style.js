var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { styled as MUIStyled } from '@mui/material';
import { Accordion as MuiExpansionPanel } from '@mui/material';
export var ExpansionPanel = MUIStyled(MuiExpansionPanel)({
    '& .MuiAccordion-root': {
        width: '100%',
        marginBottom: '16px',
    },
    '& .Mui-expanded': {},
});
export var arrow = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-right: 6px;\n  transition: transform cubic-bezier(0.4, 0, 0.2, 1) 0.2s;\n  &.collapsed {\n    transform: rotate(-90deg);\n  }\n"], ["\n  margin-right: 6px;\n  transition: transform cubic-bezier(0.4, 0, 0.2, 1) 0.2s;\n  &.collapsed {\n    transform: rotate(-90deg);\n  }\n"])));
export var arrow_end = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-left: 8px;\n  transition: transform cubic-bezier(0.4, 0, 0.2, 1) 0.2s;\n  &.collapsed {\n    transform: rotate(-90deg);\n  }\n"], ["\n  margin-left: 8px;\n  transition: transform cubic-bezier(0.4, 0, 0.2, 1) 0.2s;\n  &.collapsed {\n    transform: rotate(-90deg);\n  }\n"])));
export var ArrowWrap = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n"], ["\n  display: flex;\n  align-items: center;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
