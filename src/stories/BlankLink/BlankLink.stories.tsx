import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import BlankLink from './BlankLink';
import { BrowserRouter } from 'react-router-dom';
import { IBlankLinkProps } from './type';

export default {
  title: 'Component/BlankLink',
  component: BlankLink,
} as ComponentMeta<typeof BlankLink>;

const Template: Story<IBlankLinkProps> = (args) => (
  <BrowserRouter>
    <BlankLink to={'/'}>Children</BlankLink>
  </BrowserRouter>
);

export const Basic = Template.bind({});
