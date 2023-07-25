import React, { ReactElement, useMemo, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '../Accordion';
import Tooltip from '../Tooltip';
import { AccordionTitle } from '../Accordion/style';
import { ExpandMsg, FileInfo, FileName } from './DiffViewer.style';
import ReactDiffViewer, {
  ReactDiffViewerProps,
  ReactDiffViewerStylesOverride,
} from 'react-diff-viewer';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

export interface IDiffViewerProps extends ReactDiffViewerProps {
  id: number | string;
  expanded: boolean;
  filePath: string;
  onExpanded: (name: string | number, nextExpanded: boolean) => void;
}

function DiffViewer({
  id,
  expanded,
  onExpanded,
  splitView,
  oldValue = '',
  newValue = '',
  filePath = '',
  ...props
}: IDiffViewerProps): ReactElement {
  const { t } = useTranslation();
  const theme = useContext(PlayceThemeContext);

  const getFileName = useMemo(() => {
    const names = filePath.split('/');
    const name = names[names.length - 1];
    const ellipsisName = `/${names.slice(1, 4).join('/')}/.../${names.slice(-4, -1).join('/')}/`;

    return names.length === 1 ? (
      filePath
    ) : (
      <FileInfo>
        {names?.length > 8 ? ellipsisName : filePath.replace(name, '')}
        <FileName>{name}</FileName>
      </FileInfo>
    );
  }, [filePath]);

  const expandCode = useCallback(
    (line: number) => {
      return <ExpandMsg>{t('Show more {{line}} lines', { line })}</ExpandMsg>;
    },
    [t],
  );

  const customStyles = useMemo((): ReactDiffViewerStylesOverride => {
    return {
      variables: {
        light: {
          removedBackground: ' rgba(255, 148, 180, 0.2)',
          removedGutterBackground: 'rgba(255, 148, 180, 0.2) !important',
          removedGutterColor: '#323338',
          addedBackground: 'rgba(0, 200, 117, 0.2)',
          addedGutterBackground: 'rgba(0, 200, 117, 0.2) !important',
          addedGutterColor: '#323338',
        },
      },
      gutter: {
        minWidth: '40px',
        background: '#E6E9EF',
        textAlign: 'center',
        borderRight: '1px solid #C5C7D0',

        ':hover': {
          cursor: 'unset',
          background: '#E6E9EF',
        },
      },
      line: {
        pre: {
          lineHeight: '22px',
          fontSize: '14px',
          fontWeight: 400,
          color: '#323338',
          opacity: '1',
        },
      },
      diffContainer: {
        border: '1px solid #E6E9EF',
      },
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Accordion
        key={id}
        name={id}
        expanded={expanded}
        summaryProps={{
          children: (
            <Tooltip title={filePath} arrow placement="top">
              <AccordionTitle>{getFileName}</AccordionTitle>
            </Tooltip>
          ),
        }}
        onChange={onExpanded}
      >
        <ReactDiffViewer
          oldValue={oldValue}
          newValue={newValue}
          splitView={splitView}
          disableWordDiff={true}
          codeFoldMessageRenderer={expandCode}
          styles={customStyles}
          {...props}
        />
      </Accordion>
    </ThemeProvider>
  );
}

export default DiffViewer;
