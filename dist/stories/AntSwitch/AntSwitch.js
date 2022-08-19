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
import { Switch, styled as MUIStyled } from "@mui/material";
import styled from "@emotion/styled";
/**
 * AntSwitch Component
 * Props 의 ClassName 이 사용이 될까요?
 */
// const Ant = styled(Switch)`
//   color: #fff;
//   width: 40px;
//   height: 19px;
//   padding: 0;
//   display: flex;
//   justify-content: flex-start;
//   & .MuiButtonBase-root {
//     justify-content: flex-start;
//   }
// `;
var AntSwitchComponent = MUIStyled(Switch)({
    color: "#fff",
    width: 40,
    height: 19,
    padding: 0,
    display: "flex",
    justifyContent: "flex-start",
    "& .MuiButtonBase-root": {
        justifyContent: "flex-start",
    },
    "& .MuiSwitch-switchBase": {
        width: 30,
        height: 19,
        padding: 2,
        color: function (props) { return props.theme.color; },
        // borderColor: theme.palette.primary.main,
        justifyContent: "flex-start",
        "& .Mui-checked": {
            transform: "translateX(12px)",
            color: "#4285f4",
            justifyContent: "flex-end",
            "& .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: "#D1D7E2",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        width: 16,
        height: 16,
        boxShadow: "none",
    },
    "& .MuiSwitch-track": {
        textAlign: "left",
        width: 40,
        height: 19,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: "#D1D7E2",
        // border: `1px solid ${theme.palette.grey[500]}`,
    },
});
var Wrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-block;\n  & .switch {\n    display: inline-flex;\n  }\n  & .label {\n    margin-left: 8px;\n    display: inline-flex;\n  }\n"], ["\n  display: inline-block;\n  & .switch {\n    display: inline-flex;\n  }\n  & .label {\n    margin-left: 8px;\n    display: inline-flex;\n  }\n"])));
function AntSwitch(props) {
    return (_jsxs(Wrapper, { children: [_jsx(AntSwitchComponent, __assign({ className: "switch" }, props)), _jsx("span", __assign({ className: "label" }, { children: props.label }))] }));
}
export default AntSwitch;
var templateObject_1;
