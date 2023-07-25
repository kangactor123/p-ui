import React, { ReactElement, ReactNode, useContext } from 'react';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { wrapperStyle } from './CodeViewer.style';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

export interface ICodeViewerProps extends SyntaxHighlighterProps {
  children: ReactNode;
}

function CodeViewer({
  children,
  language = 'javascript',
  wrapLines = true,
  wrapLongLines = false,
  showLineNumbers = true,
  ...props
}: ICodeViewerProps): ReactElement {
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default CodeViewer;
