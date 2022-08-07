import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryAccordion, { IAccordionProps } from './Accordion';

export default {
  title: 'Component/Accordion',
  component: StoryAccordion,
} as ComponentMeta<typeof StoryAccordion>;

const Accordion: Story<IAccordionProps> = (args) => <StoryAccordion {...args} />;

export const Basic = Accordion.bind({});
