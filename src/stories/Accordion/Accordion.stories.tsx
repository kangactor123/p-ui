import React, { useCallback, useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import Accordion from './Accordion';
import { IAccordionProps } from './type';
import AccordionAction from '../AccordionAction';
import { Title } from './style';

export default {
  title: 'Component/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

type TTest = {
  test: boolean;
};

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

const SecondStory: Story<IAccordionProps> = () => {
  const [expand, setExpand] = useState<TTest>({ test: true });
  const handleExpand = useCallback(
    (name: string | number, nextExpanded: boolean) => {
      setExpand({ ...expand, [name]: nextExpanded });
    },
    [expand, setExpand],
  );
  return (
    <div>
      <AccordionAction<TTest> expanded={expand} setExpanded={setExpand} />
      <Accordion
        name={'test'}
        expanded={expand.test}
        onChange={handleExpand}
        summaryProps={{ children: <Title>Test</Title> }}
      >
        <div>this is sample test</div>
      </Accordion>
    </div>
  );
};

export const Basic = StoryAccordion.bind({});
export const Second = SecondStory.bind({});
