import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import Accordion from './Accordion';
import { IAccordionProps } from './type';

export default {
  title: 'Component/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const StoryAccordion: Story<IAccordionProps> = (args) => {
  return (
    <Accordion
      {...args}
      name={'아코디언'}
      expanded={true}
      onChange={() => {}}
      summaryProps={{ children: <div>props</div> }}
    />
  );
};

export const Basic = StoryAccordion.bind({});
