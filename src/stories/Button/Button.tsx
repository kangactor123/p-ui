import React, { ReactElement } from "react";
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from "@mui/material";

/**
 * Button Docs
 * MUI Component 활용
 */

export interface ButtonProps extends MUIButtonProps {
  text: string;
}

function Button(props: ButtonProps): ReactElement {
  return <MUIButton {...props}>{props.text}</MUIButton>;
}

Button.defaultProps = {
  variant: "outlined",
};

export default Button;
