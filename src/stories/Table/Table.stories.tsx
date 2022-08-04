import React, { PropsWithChildren, useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import Table, { ITable } from './Table';

// interface ITable {}
// const Table = (props: ITable): JSX.Element => <div>table</div>;

interface Student {
  name: string;
  age: number;
}

export default {
  title: 'Component/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const tableData: Student[] = [
  { name: 'dh', age: 25 },
  { name: 'dh', age: 25 },
  { name: 'dh', age: 25 },
  { name: 'dh', age: 25 },
];

const column = () => [
  {
    Header: 'name',
    id: 'name',
    width: 60,
    accessor: (val: Student) => val.name,
    Cell: ({ value, row }: { value: Student['name']; row: { original: Student } }) => <span>{value}</span>,
  },
  {
    Header: 'age',
    id: 'age',
    width: 60,
    accessor: (val: Student) => val.name,
    Cell: ({ value, row }: { value: Student['age']; row: { original: Student } }) => <span>{value}</span>,
  },
];

const Template: Story<ITable<Student>> = (args) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const columns = column();
  return (
    <Table {...args} name="student" idColumn="name" selectedRows={selectedRows} data={tableData} columns={columns} />
  );
};

export const Basic = Template.bind({});
