import { ReactElement } from "react";
/**
 * Spinner Component
 * @returns Spinner
 */
export declare enum SpinnerSize {
    small = 20,
    medium = 60,
    large = 100
}
export declare enum SpinnerType {
    blank = "blank",
    balls = "balls",
    bars = "bars",
    bubbles = "bubbles",
    cubes = "cubes",
    cylon = "cylon",
    spin = "spin",
    spinningBubbles = "spinningBubbles",
    spokes = "spokes"
}
export interface ISpinnerProps {
    loading?: boolean;
    size?: SpinnerSize;
    type?: SpinnerType;
    color?: string;
    height?: number | string;
    width?: number | string;
    className?: any;
    fixed?: boolean;
}
declare function Spinner(props: ISpinnerProps): ReactElement;
export default Spinner;
