import React, { ReactElement, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '../Accordion';
import Tooltip from '../Tooltip';
import { AccordionTitle } from '../Accordion/style';
import { ExpandMsg, FileInfo, FileName } from './DiffViewer.style';
import ReactDiffViewer from 'react-diff-viewer';

export interface IDiffViewerProps {
  //Todo: define props
  id: number | string;
  expanded: boolean;
  onExpanded: (name: string | number, nextExpanded: boolean) => void;
  splitView?: boolean;
  oldValue: string;
  newValue: string;
  filePath: string;
}

function DiffViewer({
  id,
  expanded,
  onExpanded,
  splitView,
  oldValue = '',
  newValue = '',
  filePath = '',
}: IDiffViewerProps): ReactElement {
  const { t } = useTranslation();

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

  return (
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
      />
    </Accordion>
  );
}

export default DiffViewer;
