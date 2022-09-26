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
import { useCallback, useState } from 'react';
import { cx } from '@emotion/css';
import { AccordionDetails as ExpansionPanelDetails, } from '@mui/material';
import { ExpansionPanel } from './Accordion.style';
import ExpansionPanelSummaryChildren from './ExpansionPanelSummaryChildren/ExpansionPanelSummaryChildren';
function Accordion(_a) {
    var children = _a.children, summary = _a.summary, name = _a.name, propOnChange = _a.onChange, _b = _a.summaryProps, summaryProps = _b === void 0 ? {} : _b, _c = _a.detailProps, detailProps = _c === void 0 ? {} : _c, panelDetailClassName = _a.panelDetailClassName, _d = _a.useEdgeStartIcon, useEdgeStartIcon = _d === void 0 ? true : _d, _e = _a.useEdgeEndIcon, useEdgeEndIcon = _e === void 0 ? false : _e, _f = _a.useEndIcon, useEndIcon = _f === void 0 ? false : _f, _g = _a.timeout, timeout = _g === void 0 ? 300 : _g, _h = _a.isRemoveDetailOnCollapsed, isRemoveDetailOnCollapsed = _h === void 0 ? false : _h, props = __rest(_a, ["children", "summary", "name", "onChange", "summaryProps", "detailProps", "panelDetailClassName", "useEdgeStartIcon", "useEdgeEndIcon", "useEndIcon", "timeout", "isRemoveDetailOnCollapsed"]);
    var _j = useState(typeof props.defaultExpanded === 'boolean' ? props.defaultExpanded : true), internalExpanded = _j[0], setInternalExpanded = _j[1];
    if (props.setIsExpanded) {
        props.setIsExpanded(internalExpanded);
    }
    var onChange = useCallback(function (_, expanded) {
        if (propOnChange instanceof Function) {
            propOnChange(name, expanded);
        }
        setInternalExpanded(!internalExpanded);
    }, [internalExpanded, propOnChange, name]);
    return (_jsxs(ExpansionPanel, __assign({ TransitionProps: {
            timeout: timeout,
        }, expanded: internalExpanded, onChange: onChange }, props, { children: [_jsx(ExpansionPanelSummaryChildren, __assign({ expanded: typeof props.expanded === 'boolean' ? props.expanded : internalExpanded, useEdgeEndIcon: useEdgeEndIcon, useEdgeStartIcon: useEdgeStartIcon, useEndIcon: useEndIcon }, summaryProps)), _jsx(ExpansionPanelDetails, __assign({ className: cx(panelDetailClassName) }, detailProps, { children: !isRemoveDetailOnCollapsed ? children : internalExpanded || props.expanded ? children : null }))] })));
}
export default Accordion;
Accordion.defaultProps = {};
