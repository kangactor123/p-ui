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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Tabs as MUITabs, Tab as MUITab } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
function a11yProps(index) {
    return {
        id: "tab-".concat(index),
        'aria-controls': "tabpanel-".concat(index),
    };
}
Tab.defaultProps = {
    indicatorColor: 'primary',
};
function Tab(_a) {
    var tabList = _a.tabList, activeValue = _a.activeValue, delayTime = _a.delayTime, onChange = _a.onChange, handleChange = _a.handleChange, handleClick = _a.handleClick, props = __rest(_a, ["tabList", "activeValue", "delayTime", "onChange", "handleChange", "handleClick"]);
    var defaultTabValue = useMemo(function () { return (tabList.length ? (activeValue ? activeValue : tabList[0].value) : ''); }, [tabList, activeValue]);
    var _b = useState(defaultTabValue), value = _b[0], setValue = _b[1];
    useEffect(function () {
        setValue(activeValue);
    }, [activeValue]);
    return (_jsx(MUITabs, __assign({ value: value, onChange: handleChange }, props, { children: tabList.map(function (tab) { return (_jsx(MUITab, __assign({ onClick: function () { return handleClick(tab); } }, tab, a11yProps(tab.value)), tab.value)); }) })));
}
export default Tab;
