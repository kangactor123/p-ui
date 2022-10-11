import React, { ReactElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export interface ICodeViewerProps extends SyntaxHighlighterProps {
  //Todo: define props
  children: ReactNode;
}

const wrapperStyle = css`
  width: 100%;
  position: relative;
  border: solid 1px #d8d8d8;
  max-height: 404px;
  overflow-y: auto;

  pre {
    background-color: #fff !important;
    padding: 0 0 0 0 !important;
  }

  span {
    line-height: 20px;
  }

  .linenumber {
    background-color: rgba(216, 216, 216, 0.34);
    min-height: 16px;
    min-width: 44px !important;
    padding-right: 7px !important;
    margin-right: 16px;
  }
`;

function CodeViewer({
  children,
  language = 'javascript',
  wrapLines = true,
  wrapLongLines = false,
  showLineNumbers = true,
  ...props
}: ICodeViewerProps): ReactElement {
  return (
    <div css={wrapperStyle}>
      <SyntaxHighlighter
        wrapLines
        wrapLongLines
        customStyle={{
          width: '100%',
        }}
        language={language}
        style={docco}
        showLineNumbers={showLineNumbers}
        {...props}
      >
        {children?.toString() || ''}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeViewer;
