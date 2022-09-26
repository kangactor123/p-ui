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
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
function AccordionAction(_a) {
    var expanded = _a.expanded, setExpanded = _a.setExpanded;
    var t = useTranslation().t;
    var isAllCollapsed = useCallback(function () {
        return expanded && !Object.keys(expanded).some(function (key) { return expanded[key]; });
    }, [expanded]);
    var handleClick = useCallback(function () {
        var newExpanded = __assign({}, expanded);
        var isCollapsed = isAllCollapsed();
        Object.keys(expanded).forEach(function (key) {
            newExpanded[key] = isCollapsed;
        });
        if (setExpanded instanceof Function) {
            setExpanded(newExpanded);
        }
    }, [expanded, isAllCollapsed, setExpanded]);
    var label = useMemo(function () { return (isAllCollapsed() ? t('Expand All') : t('Collapse All')); }, [isAllCollapsed, t]);
    var icon = useMemo(function () { return (isAllCollapsed() ? _jsx(IconTogExpandGray, {}) : _jsx(IconTogCollapseGray, {})); }, [isAllCollapsed]);
    return (_jsx(Button, __assign({ variant: "text", onClick: handleClick, endIcon: icon }, { children: label })));
}
export default AccordionAction;
