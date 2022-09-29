import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import { Dd, Dl, Dt, ItemWrap } from './DefinitionList.style';
import Clipboard from '../Clipboard';

export type TDefinitionType = 'single' | 'multi';
export interface IDefinitionValue {
  title: string;
  description: ReactNode;
  hidden?: boolean;
  style?: CSSProperties;
  copyProps?: {
    disabled: boolean;
    value?: string;
  };
}
export interface IDefinitionListProps {
  //Todo: define props
  value: IDefinitionValue[];
  type?: TDefinitionType;
  isEng: boolean;
}

function DefinitionList({ value, type = 'multi', isEng }: IDefinitionListProps): ReactElement {
  return (
    <Dl>
      {value?.map(({ title, description, style, copyProps }, index) => (
        <ItemWrap key={index} type={type} style={style}>
          <Dt>{title}</Dt>
          <Dd>
            {description}
            {!copyProps?.disabled && description && (
              <Clipboard title={title} value={(copyProps?.value || description) as string} isEng={isEng} />
            )}
          </Dd>
        </ItemWrap>
      ))}
    </Dl>
  );
}

export default DefinitionList;
