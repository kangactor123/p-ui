import { ReactElement } from "react";
import { ButtonProps as MUIButtonProps } from "@mui/material";
/**
 * Button Docs
 * MUI Component 활용
 */
export interface ButtonProps extends MUIButtonProps {
    text: string;
}
declare function Button(props: ButtonProps): ReactElement;
declare namespace Button {
    var defaultProps: {
        variant: string;
    };
}
export default Button;
