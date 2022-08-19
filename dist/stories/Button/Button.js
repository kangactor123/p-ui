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
import { Button as MUIButton, } from "@mui/material";
function Button(props) {
    return _jsx(MUIButton, __assign({}, props, { children: props.text }));
}
Button.defaultProps = {
    variant: "outlined",
};
export default Button;
