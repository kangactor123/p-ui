import React, { ReactElement, useContext } from 'react';
import { PlayceThemeContext, ThemeProvider } from '../../../providers';

export type TDeleteList = {
  id: number;
  name: string;
};

export interface IDeleteConfirmChildProps {
  title: string;
  data: TDeleteList[];
}

function DeleteConfirmChild({ data, title }: IDeleteConfirmChildProps): ReactElement {
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div>{title}</div>
        <ul className={'item-list'}>
          {data.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
    </ThemeProvider>
  );
}

export default DeleteConfirmChild;
