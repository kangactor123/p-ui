import { ReactElement } from "react";
import { SwitchProps } from "@mui/material";
export interface IAntSwitchProps extends SwitchProps {
    label: string;
}
declare function AntSwitch(props: IAntSwitchProps): ReactElement;
export default AntSwitch;
