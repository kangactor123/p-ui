import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryCodeEditor, { TCodeEditorProps } from './CodeEditor';

export default {
  title: 'Component/CodeEditor',
  component: StoryCodeEditor,
} as ComponentMeta<typeof StoryCodeEditor>;

export type TSample = {
  sample: string;
};

const CodeEditor: Story<TCodeEditorProps<TSample>> = (args) => <StoryCodeEditor {...args} />;

export const Basic = CodeEditor.bind({});
