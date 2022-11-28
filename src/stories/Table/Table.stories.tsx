import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import Table, { ITable } from './Table';
import { Column } from 'react-table';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Component/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

interface SampleData {
  id: number;
  name: string;
  count: number;
}

const sampleColumns: Column<SampleData>[] = [
  {
    id: 'id',
    Header: 'ID',
    accessor: (val: SampleData) => val.id,
  },
  {
    id: 'name',
    Header: 'Name',
    accessor: (val: SampleData) => val.name,
  },
  {
    id: 'count',
    Header: 'Count',
    accessor: (val: SampleData) => val.count,
  },
];

const Template: Story<ITable<SampleData>> = (args) => {
  const data: SampleData[] = [
    { id: 1, name: 'Sample1', count: 5 },
    { id: 2, name: 'Sample2', count: 10 },
    { id: 3, name: 'Sample3', count: 30 },
  ];
  // story에서는 임시적으로 pagination과 toolbar사용을 막음
  return (
    <BrowserRouter>
      <Table name="table-sample" columns={sampleColumns} data={data} />
    </BrowserRouter>
  );
};

export const Basic = Template.bind({});
