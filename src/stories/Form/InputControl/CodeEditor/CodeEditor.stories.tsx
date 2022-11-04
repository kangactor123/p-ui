import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryCodeEditor, { TCodeEditorProps } from './CodeEditor';
import { useForm } from 'react-hook-form';
import { TSampleFormControl } from '../InputText/InputText.stories';

export default {
  title: 'Component/CodeEditor',
  component: StoryCodeEditor,
} as ComponentMeta<typeof StoryCodeEditor>;

export type TSample = {
  sample: string;
};

const CodeEditor: Story<TCodeEditorProps<TSample>> = (args) => {
  const { control } = useForm<TSampleFormControl>({
    mode: 'all',
    defaultValues: {
      sample: `import io.playce.migrator.dto.migration.MigrationRuleRequest`,
    },
  });
  return <StoryCodeEditor {...args} control={control} rules={{ required: true }} name={'sample'} />;
};

export const Basic = CodeEditor.bind({});
