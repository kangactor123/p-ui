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
import { AccordionSummary as ExpansionPanelSummary, } from '@mui/material';
import { ArrowWrap } from '../Accordion.style';
function ExpansionPanelSummaryChildren(_a) {
    var expanded = _a.expanded, children = _a.children, useEdgeEndIcon = _a.useEdgeEndIcon, useEdgeStartIcon = _a.useEdgeStartIcon, useEndIcon = _a.useEndIcon, expandIcon = _a.expandIcon, props = __rest(_a, ["expanded", "children", "useEdgeEndIcon", "useEdgeStartIcon", "useEndIcon", "expandIcon"]);
    return (_jsxs(ExpansionPanelSummary, __assign({ expandIcon: useEdgeEndIcon ? expandIcon : undefined }, props, { children: [useEdgeStartIcon ? _jsx(ArrowWrap, {}) : null, children, useEndIcon ? (_jsx(ArrowWrap, {})) : null] })));
}
export default ExpansionPanelSummaryChildren;
