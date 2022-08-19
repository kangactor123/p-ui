import { ReactElement, ReactNode } from 'react';
export interface IDndFileProps {
    onDrop: (file: File) => void;
    children: ReactNode;
}
declare function DndFile({ onDrop: onDropProp, children }: IDndFileProps): ReactElement;
export default DndFile;
