import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import Table, { ITable } from './Table';
import { Column } from 'react-table';
import { BrowserRouter } from 'react-router-dom';
import { TableNoDataComponent } from './TableNoDataComponent';

export default {
  title: 'Component/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

interface SampleData {
  id: number;
  name: string;
  count: number;
  age: number;
  address: string;
  email: string;
  phone: string;
  descrpition: string;
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
    id: 'age',
    Header: 'age',
    accessor: (val: SampleData) => val.count,
  },
  {
    id: 'address',
    Header: 'addressaddress',
    accessor: (val: SampleData) => val.count,
  },
  {
    id: 'email',
    Header: 'email',
    accessor: (val: SampleData) => val.count,
  },
  {
    id: 'phone',
    Header: 'phone',
    accessor: (val: SampleData) => val.count,
  },
  {
    id: 'description',
    Header: 'description',
    accessor: (val: SampleData) => val.count,
  },
];

const Template: Story<ITable<SampleData>> = (args) => {
  const data: SampleData[] = [
    // {
    //   id: 1,
    //   name: 'Sample1',
    //   count: 5,
    //   age: 12,
    //   address: '통일로 1030101010101010',
    //   email: 'kangakngakng',
    //   phone: '102020201010',
    //   descrpition: 'Sample data',
    // },
  ];
  // story에서는 임시적으로 pagination과 toolbar사용을 막음
  return (
    <BrowserRouter>
      <Table
        name="table-sample"
        columns={sampleColumns}
        data={data}
        idColumn={null}
        usePagination={true}
        noDataComponent={
          <TableNoDataComponent
            message={'You do not have any application.'}
            buttonTitle={'Add Application'}
            buttonOnClick={() => {}}
          />
        }
      />
    </BrowserRouter>
  );
};

export const Basic = Template.bind({});
