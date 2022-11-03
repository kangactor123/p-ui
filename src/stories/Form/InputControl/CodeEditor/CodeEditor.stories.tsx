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
      sample: `import
      io.playce.migrator.dto.migration.MigrationRuleRequest
     import
      io.playce.migrator.dto.migration.MigrationRuleResult
     import
      io.playce.migrator.migration.process.util.CommentUtil
     import
      io.playce.migrator.migration.process.util.ResultUtil
     import
      java.util.Map
     rule 
     "Convert source to target string in properties file"
     
         when
             
     request
     : MigrationRuleRequest(c: content);
         then
             MigrationRuleResult result = ResultUtil.makeMigrationRuleResult(ruleId, request);
             
     Map
     <
     String
     , 
     String
     > map = request.getInput();
             
     String
      source = map.get(
     "source"
     );
             
     String
      target = map.get(
     "target"
     );
             
     if
     (c.contains(source)) {
                 
     String
      newContent = CommentUtil.addComment(c, 
     "#"
     ) + c.replaceAll(source, target);
                 result.setContent(newContent);
             } 
     else
      {
                 result.setContent(c);
             }
     end;
     `,
    },
  });
  return <StoryCodeEditor {...args} control={control} rules={{ required: true }} name={'sample'} />;
};

export const Basic = CodeEditor.bind({});
