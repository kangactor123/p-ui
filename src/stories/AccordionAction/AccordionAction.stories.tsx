import React, { useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryAccordionAction from './AccordionAction';
import { IAccordionAction } from './type';

interface AccordionType {
  test: boolean;
}

export default {
  title: 'Component/AccordionAction',
  component: StoryAccordionAction,
} as ComponentMeta<typeof StoryAccordionAction>;

const AccordionAction: Story<IAccordionAction<AccordionType>> = (args) => {
  const [first, setFirst] = useState<AccordionType>({
    test: true,
  });

  return <StoryAccordionAction<AccordionType> setExpanded={setFirst} expanded={first} />;
};

export const Basic = AccordionAction.bind({});
