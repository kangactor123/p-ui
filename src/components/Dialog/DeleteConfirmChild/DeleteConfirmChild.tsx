import React, { ReactElement } from 'react';

export type TDeleteList = {
  id: number;
  name: string;
};

export interface IDeleteConfirmChildProps {
  title: string;
  data: TDeleteList[];
}

function DeleteConfirmChild({ data, title }: IDeleteConfirmChildProps): ReactElement {
  return (
    <div>
      <div>{title}</div>
      <ul className={'item-list'}>
        {data.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DeleteConfirmChild;
