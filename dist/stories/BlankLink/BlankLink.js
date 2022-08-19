var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styled from "@emotion/styled";
var Link = styled(RouterLink)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  vertical-align: middle;\n  cursor: pointer;\n  &:hover {\n    text-decoration: underline;\n  }\n"], ["\n  vertical-align: middle;\n  cursor: pointer;\n  &:hover {\n    text-decoration: underline;\n  }\n"])));
var Icon = styled(OpenInNewIcon)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-left: ", ";\n  margin-right: ", ";\n  vertical-align: middle;\n"], ["\n  margin-left: ", ";\n  margin-right: ", ";\n  vertical-align: middle;\n"])), function (props) { return !props.isLeftIcon && "5px"; }, function (props) { return props.isLeftIcon && "5px"; });
function BlankLink(props) {
    var to = props.to, text = props.text, _a = props.isLeftIcon, isLeftIcon = _a === void 0 ? false : _a;
    var LinkIcon = useMemo(function () { return function () { return _jsx(Icon, { isLeftIcon: isLeftIcon, fontSize: "small" }); }; }, [isLeftIcon]);
    return (_jsx(Link, __assign({ to: to, target: "_blank" }, { children: isLeftIcon ? (_jsxs(_Fragment, { children: [_jsx(LinkIcon, {}), text] })) : (_jsxs(_Fragment, { children: [text, _jsx(LinkIcon, {})] })) })));
}
export default BlankLink;
var templateObject_1, templateObject_2;
