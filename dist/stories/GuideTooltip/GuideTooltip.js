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
import { Fragment as _Fragment, jsx as _jsx } from "@emotion/react/jsx-runtime";
function getIconSizeStyle(size) {
    if (size === void 0) { size = 18; }
    var width = typeof size === 'number' ? "".concat(size, "px") : size;
    return { width: width, height: width };
}
function GuideTooltip(_a) {
    var size = _a.size, tooltipProps = __rest(_a, ["size"]);
    var _b = tooltipProps.iconProps || {}, style = _b.style, iconProps = __rest(_b, ["style"]);
    return (
    // <Tooltip {...tooltipProps}>
    //   <IconInfo style={{ ...getIconSizeStyle(size), ...style }} {...iconProps} />
    // </Tooltip>
    _jsx(_Fragment, {}));
}
export default GuideTooltip;
