import React, { ReactElement, useCallback, useState } from 'react';
import { IconButton as MuiIconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import copy from 'copy-to-clipboard';
import styled from '@emotion/styled';
import { IconCopy } from '../icons';

export interface IClipboardProps {
  //Todo: define props
  value: string;
  title: string;
  isEng: boolean;
}

const IconButton = styled(MuiIconButton)(`
  width: 24px;
  height: 24px;
`);

function Clipboard({ value, title, isEng }: IClipboardProps): ReactElement {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [tooltipTitle, setTooltipTitle] = useState<string>(isEng ? 'Clipboard copy' : '클립보드 복사');

  const handleOnCopy = useCallback(() => {
    setTooltipTitle(`${title} ${isEng ? 'Copied' : '복사됨'}`);
    copy(value);
    setIsCopied(true);

    const timeout = setTimeout(() => {
      setShowTooltip(false);
      setIsCopied(false);
      clearTimeout(timeout);
    }, 1000);
  }, [value, title, isEng]);

  const handleOnMouseEnter = useCallback(() => {
    setTooltipTitle(isEng ? 'Clipboard copy' : '클립보드 복사');
    setShowTooltip(true);
  }, [isEng]);

  const handleOnMouseLeave = useCallback(() => {
    if (!isCopied) {
      setShowTooltip(false);
    }
  }, [isCopied]);

  return (
    <Tooltip
      arrow
      disableFocusListener
      disableHoverListener
      title={tooltipTitle}
      open={showTooltip}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <IconButton size="small" onClick={handleOnCopy}>
        <IconCopy />
      </IconButton>
    </Tooltip>
  );
}

export default Clipboard;
