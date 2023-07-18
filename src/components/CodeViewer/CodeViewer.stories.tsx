import React from 'react';

import { ComponentMeta, Story } from '@storybook/react';
import StoryCodeViewer, { ICodeViewerProps } from './CodeViewer';

export default {
  title: 'Component/CodeViewer',
  component: StoryCodeViewer,
} as ComponentMeta<typeof StoryCodeViewer>;

const message =
  'import io.playce.migrator.dto.analysis.AnalysisRuleRequest\nimport io.playce.migrator.dto.analysis.AnalysisRuleResult\nimport io.playce.migrator.migration.process.util.ResultUtil\n\nrule "Detect - IP Pattern"\n    when\n        request: AnalysisRuleRequest(content matches ".*([0-9]{1,3})\\\\.([0-9]{1,3})\\\\.([0-9]{1,3})\\\\.([0-9]{1,3}).*" , c: content)\n    then\n        AnalysisRuleResult result = ResultUtil.makeAnalysisRuleResult(${ruleId}, request);\n        result.setDetectedString(c.trim());\n        result.setOverrideComment("IP Address Pattern 이 발견 되었습니다.");\nend;';

const CodeViewer: Story<ICodeViewerProps> = (args) => <StoryCodeViewer {...args} />;
export const Basic = CodeViewer.bind({});

Basic.args = {
  children: message,
  language: 'java',
  wrapLines: true,
  wrapLongLines: false,
  showLineNumbers: true,
};
