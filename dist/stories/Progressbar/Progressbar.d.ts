/** @jsxImportSource @emotion/react */
import { ReactElement } from 'react';
export interface IProgressbarProps {
    className?: string;
    value: number;
    isLabel?: boolean;
    progressColor?: string;
    backgroundColor?: string;
}
declare function Progressbar(props: IProgressbarProps): ReactElement;
export default Progressbar;
