var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useCallback } from 'react';
import { css } from '@emotion/react';
import { IconArrow2DownBlack } from '../icons';
import { AccordionDetails, AccordionPanel, AccordionSummary } from './style';
function Accordion(_a) {
    var _b = _a.summaryProps, _c = _b.iconPosition, iconPosition = _c === void 0 ? 'start' : _c, _d = _b.useEdgeEndIcon, useEdgeEndIcon = _d === void 0 ? true : _d, summaryChildren = _b.children, summaryProps = __rest(_b, ["iconPosition", "useEdgeEndIcon", "children"]), detailsProps = _a.detailsProps, children = _a.children, name = _a.name, _e = _a.defaultExpanded, defaultExpanded = _e === void 0 ? true : _e, onChange = _a.onChange, props = __rest(_a, ["summaryProps", "detailsProps", "children", "name", "defaultExpanded", "onChange"]);
    var handleChange = useCallback(function (event, expanded) {
        if (onChange instanceof Function) {
            onChange(name, expanded);
        }
    }, [onChange, name]);
    return (_jsxs(AccordionPanel, __assign({ defaultExpanded: defaultExpanded, onChange: handleChange }, props, { children: [_jsx(AccordionSummary, __assign({ css: css({
                    '& .MuiAccordionSummary-content,& .MuiAccordionSummary-content.Mui-expanded': {
                        marginLeft: iconPosition === 'end' ? '0px' : '6px',
                    },
                    flexDirection: iconPosition === 'end' ? undefined : 'row-reverse',
                    '& .MuiAccordionSummary-expandIconWrapper': {
                        transform: 'rotate(270deg)',
                    },
                }), expandIcon: useEdgeEndIcon ? _jsx(IconArrow2DownBlack, {}) : null }, summaryProps, { children: summaryChildren })), _jsx(AccordionDetails, __assign({}, detailsProps, { children: children }))] })));
}
export default Accordion;
