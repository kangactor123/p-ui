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
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { StepConnector, styled as MUIStyled, Stepper as MUIStepper, Step, StepLabel as MUIStepLabel, } from '@mui/material';
// import { IconStepperComplete } from "../../common/icons";
import styled from '@emotion/styled';
import { createTheme, ThemeProvider } from '@mui/system';
/**
 * 작업 필요
 */
var IconBox = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 8px 7px 7px 8px;\n  color: #ffffff;\n  font-size: 12.8px;\n  font-weight: 900;\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n"], ["\n  padding: 8px 7px 7px 8px;\n  color: #ffffff;\n  font-size: 12.8px;\n  font-weight: 900;\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n"])));
var ActiveBox = styled(IconBox)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background-color: #4285f4;\n"], ["\n  background-color: #4285f4;\n"])));
var NormalBox = styled(IconBox)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: #bec5d3;\n"], ["\n  background-color: #bec5d3;\n"])));
var StepLabel = styled(MUIStepLabel)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  cursor: pointer;\n"], ["\n  cursor: pointer;\n"])));
var QontoConnector = MUIStyled(StepConnector)({
    '& .MuiStepConnector-active': {
        borderColor: '#4285f4',
    },
    '& .Mui-completed': {
        borderColor: '#4285f4',
    },
    '& .MuiStepConnector-line': {
        borderColor: '#bec5d3',
        borderTopWidth: 2,
    },
});
var stepperTheme = createTheme({
    components: {
        MUIStepper: {
            StepConnector: {
                vertical: {
                    marginLeft: '9px',
                    margin: '-2px 0px -3px 0px',
                    padding: '0px',
                },
                lineVertical: {
                    minHeight: '35px',
                    borderLeftWidth: '2px',
                },
            },
        },
    },
});
function QontoStepIcon(props, completedSet) {
    var active = props.active, icon = props.icon;
    return completedSet.has(icon - 1) ? (
    // <IconStepperComplete />
    _jsx(_Fragment, {})) : active ? (_jsxs(ActiveBox, { children: ["0", icon] })) : (_jsxs(NormalBox, { children: ["0", icon] }));
}
function Stepper(_a) {
    var handleStep = _a.handleStep, activeStep = _a.activeStep, completed = _a.completed, steps = _a.steps, _b = _a.orientation, orientation = _b === void 0 ? 'vertical' : _b, props = __rest(_a, ["handleStep", "activeStep", "completed", "steps", "orientation"]);
    return (_jsx(ThemeProvider, __assign({ theme: stepperTheme }, { children: _jsx(MUIStepper, __assign({ connector: _jsx(QontoConnector, {}), activeStep: activeStep, orientation: orientation }, { children: steps.map(function (_a, index) {
                var title = _a.title, value = _a.value;
                return (_jsx(Step, { children: _jsx(StepLabel
                    // disabled={disabled}
                    , __assign({ 
                        // disabled={disabled}
                        StepIconComponent: function (props) { return QontoStepIcon(props, completed); }, onClick: handleStep(index) }, { children: title || value + '' })) }, index));
            }) })) })));
}
export default Stepper;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
