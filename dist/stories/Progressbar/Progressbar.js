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
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { css } from '@emotion/react';
import { Box, LinearProgress, Typography } from '@mui/material';
var wrapper = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  position: relative;\n"], ["\n  width: 100%;\n  position: relative;\n"])));
function Progressbar(props) {
    // const { t } = useTranslation();
    var className = props.className, value = props.value, _a = props.isLabel, isLabel = _a === void 0 ? true : _a, backgroundColor = props.backgroundColor, progressColor = props.progressColor;
    var muiBox = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    margin-right: '0px';\n  "], ["\n    margin-right: '0px';\n  "])));
    var muiProgress = css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    border-radius: 4px;\n    height: 16px;\n    background-color: ", ";\n\n    & > span {\n      background-color: ", ";\n    }\n  "], ["\n    border-radius: 4px;\n    height: 16px;\n    background-color: ", ";\n\n    & > span {\n      background-color: ", ";\n    }\n  "])), backgroundColor, progressColor);
    var muiTypography = css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    color: #ffffff;\n    font-size: 11px;\n    font-weight: bold;\n  "], ["\n    color: #ffffff;\n    font-size: 11px;\n    font-weight: bold;\n  "])));
    var labelBox = css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    position: absolute;\n    left: 49%;\n    top: 1px;\n  "], ["\n    position: absolute;\n    left: 49%;\n    top: 1px;\n  "])));
    return (_jsx("div", __assign({ css: wrapper, className: className }, { children: _jsxs(Box, __assign({ display: "flex", alignItems: "center" }, { children: [_jsx(Box, __assign({ width: "100%", mr: 1, css: muiBox }, { children: _jsx(LinearProgress, { variant: "determinate", value: value, css: muiProgress }) })), isLabel ? (_jsx(Box, __assign({ css: labelBox, minWidth: 35 }, { children: _jsx(Typography, __assign({ css: muiTypography, variant: "body2", color: "textSecondary" }, { children: "".concat(Math.round(value), "%") })) }))) : null] })) })));
}
export default Progressbar;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
