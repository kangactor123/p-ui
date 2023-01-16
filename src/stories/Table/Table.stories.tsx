import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import Table, { ITable } from './Table';
import { Column, Row } from 'react-table';
import { BrowserRouter } from 'react-router-dom';
import { TableNoDataComponent } from './TableNoDataComponent';
import { expander } from './utils/expander';

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
    {
      id: 1,
      name: 'Sample1',
      count: 5,
      age: 12,
      address: '통일로 1030101010101010',
      email: 'kangakngakng',
      phone: '102020201010',
      descrpition: 'Sample data',
    },
    {
      id: 1,
      name: 'Sample1',
      count: 5,
      age: 12,
      address: '통일로 1030101010101010',
      email: 'kangakngakng',
      phone: '102020201010',
      descrpition: 'Sample data',
    },
    {
      id: 1,
      name: 'Sample1',
      count: 5,
      age: 12,
      address: '통일로 1030101010101010',
      email: 'kangakngakng',
      phone: '102020201010',
      descrpition: 'Sample data',
    },
    {
      id: 1,
      name: 'Sample1',
      count: 5,
      age: 12,
      address: '통일로 1030101010101010',
      email: 'kangakngakng',
      phone: '102020201010',
      descrpition: 'Sample data',
    },
    {
      id: 1,
      name: 'Sample1',
      count: 5,
      age: 12,
      address: '통일로 1030101010101010',
      email: 'kangakngakng',
      phone: '102020201010',
      descrpition: 'Sample data',
    },
    {
      id: 1,
      name: 'Sample1',
      count: 5,
      age: 12,
      address: '통일로 1030101010101010',
      email: 'kangakngakng',
      phone: '102020201010',
      descrpition: 'Sample data',
    },
  ];
  return (
    <BrowserRouter>
      <Table
        name="table-sample"
        columns={sampleColumns}
        data={data}
        idColumn={null}
        usePagination={true}
        renderRowSubComponent={(row) => <div>this</div>}
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

const noDataHere: Story<ITable<SampleData>> = (args) => {
  const data: SampleData[] = [];
  return (
    <BrowserRouter>
      <Table
        name="table-sample"
        columns={sampleColumns}
        data={data}
        idColumn={null}
        usePagination={true}
        // noDataComponent={'no Data'}
      />
    </BrowserRouter>
  );
};

type SubRowType = {
  name: string;
  age: number;
};

const subRowColumns: Column<SubRowType>[] = [
  expander<SubRowType>(),
  {
    id: 'name',
    Header: 'Name',
    accessor: (val: SubRowType) => val.name,
  },
  {
    id: 'age',
    Header: 'age',
    accessor: (val: SubRowType) => val.age,
  },
];

const subRow: Story<ITable<SubRowType>> = (args) => {
  const data: SubRowType[] = [
    { name: '1', age: 2 },
    { name: '1', age: 2 },
    { name: '1', age: 2 },
    { name: '1', age: 2 },
  ];
  const renderSubRow = (row: Row<SubRowType>) => {
    return <pre>{row.original.name}</pre>;
  };
  return (
    <BrowserRouter>
      <Table
        data={data}
        columns={subRowColumns}
        idColumn={null}
        name={`subRowTable`}
        useWrap={false}
        useToolbar={false}
        usePagination={false}
        useSelection={false}
        useRowLine={true}
        // noDataComponent={<TableNoDataComponent message={'You do not have any data.'} buttonDisplay={false} />}
        isSmallTable
        renderRowSubComponent={renderSubRow}
      />
    </BrowserRouter>
  );
};

export const Basic = Template.bind({});
export const NoData = noDataHere.bind({});
export const SubRow = subRow.bind({});
