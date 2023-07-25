import React, { CSSProperties, ReactElement, ReactNode, useContext } from 'react';
import { Dd, Dl, Dt, ItemWrap } from './DefinitionList.style';
import Clipboard from '../Clipboard';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

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
  value: IDefinitionValue[];
  type?: TDefinitionType;
}

function DefinitionList({ value, type = 'multi' }: IDefinitionListProps): ReactElement {
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <Dl>
        {value?.map(({ title, description, style, copyProps }, index) => (
          <ItemWrap key={index} type={type} style={style}>
            <Dt>{title}</Dt>
            <Dd>
              {description}
              {!copyProps?.disabled && description && (
                <Clipboard title={title} value={(copyProps?.value || description) as string} />
              )}
            </Dd>
          </ItemWrap>
        ))}
      </Dl>
    </ThemeProvider>
  );
}

export default DefinitionList;
