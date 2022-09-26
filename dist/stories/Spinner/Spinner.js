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
import { jsx as _jsx, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import ReactLoading from 'react-loading';
import styled from '@emotion/styled';
/**
 * Spinner Component
 * @returns Spinner
 */
export var SpinnerSize;
(function (SpinnerSize) {
    SpinnerSize[SpinnerSize["small"] = 20] = "small";
    SpinnerSize[SpinnerSize["medium"] = 60] = "medium";
    SpinnerSize[SpinnerSize["large"] = 100] = "large";
})(SpinnerSize || (SpinnerSize = {}));
export var SpinnerType;
(function (SpinnerType) {
    SpinnerType["blank"] = "blank";
    SpinnerType["balls"] = "balls";
    SpinnerType["bars"] = "bars";
    SpinnerType["bubbles"] = "bubbles";
    SpinnerType["cubes"] = "cubes";
    SpinnerType["cylon"] = "cylon";
    SpinnerType["spin"] = "spin";
    SpinnerType["spinningBubbles"] = "spinningBubbles";
    SpinnerType["spokes"] = "spokes";
})(SpinnerType || (SpinnerType = {}));
var Wrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 100;\n  display: flex;\n  align-items: center;\n  background-color: rgba(255, 255, 255, 0.7);\n\n  &.fixed {\n    position: fixed;\n    left: 0;\n  }\n\n  &.target-page {\n    z-index: 10000 !important;\n    background-color: rgba(255, 255, 255, 1) !important;\n  }\n"], ["\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 100;\n  display: flex;\n  align-items: center;\n  background-color: rgba(255, 255, 255, 0.7);\n\n  &.fixed {\n    position: fixed;\n    left: 0;\n  }\n\n  &.target-page {\n    z-index: 10000 !important;\n    background-color: rgba(255, 255, 255, 1) !important;\n  }\n"])));
var Loading = styled(ReactLoading)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: auto;\n"], ["\n  margin: auto;\n"])));
function Spinner(props) {
    var _a = props.loading, loading = _a === void 0 ? true : _a, _b = props.width, width = _b === void 0 ? 0 : _b, _c = props.height, height = _c === void 0 ? 0 : _c, _d = props.size, size = _d === void 0 ? SpinnerSize.large : _d, _e = props.className, className = _e === void 0 ? '' : _e;
    var _f = props.color, color = _f === void 0 ? 'black' : _f, _g = props.type, type = _g === void 0 ? SpinnerType.bars : _g, otherProps = __rest(props, ["color", "type"]);
    var widthHeight = width && height
        ? {
            width: width,
            height: height,
        }
        : {
            width: size,
            height: size,
        };
    return loading ? (_jsx(Wrapper, __assign({ className: className }, { children: _jsx(Loading, __assign({ color: color, type: type }, widthHeight, otherProps), Math.random()) }))) : (_jsx(_Fragment, {}));
}
export default Spinner;
var templateObject_1, templateObject_2;
