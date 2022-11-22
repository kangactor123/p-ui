import React, { useCallback, useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryDiffViewer, { IDiffViewerProps } from './DiffViewer';
import { IExpanded } from '../Accordion/type';

export default {
  title: 'Component/DiffViewer',
  component: StoryDiffViewer,
} as ComponentMeta<typeof StoryDiffViewer>;

const DiffViewer: Story<IDiffViewerProps> = (args) => {
  const [expanded, setExpanded] = useState<IExpanded>({
    test: true,
  });

  const onExpanded = useCallback(
    (name: string | number, nextExpanded: boolean) => {
      setExpanded({ ...expanded, [name]: nextExpanded });
    },
    [expanded],
  );

  return <StoryDiffViewer {...args} id={'test'} onExpanded={onExpanded} />;
};

export const Basic = DiffViewer.bind({});

Basic.args = {
  expanded: true,
  splitView: true,
  oldValue: `const a = 10
  const b = 10
  const c = () => console.log('foo')
  
  if(a > 10) {
    console.log('bar')
  }
  
  console.log('done')`,
  newValue: `const a = 10
  const boo = 10
  
  if(a === 10) {
    console.log('bar')
  }`,
  filePath: 'TBK-master/JavaSource/com/fw/db/DbMgr.java',
};
