import React, { ReactElement, useCallback, useState } from 'react';
import { IconButton as MuiIconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import copy from 'copy-to-clipboard';
import styled from '@emotion/styled';
import { IconCopy } from '../icons';
import { useTranslation } from 'react-i18next';

export interface IClipboardProps {
  //Todo: define props
  value: string;
  title: string;
  isEng?: boolean;  // 정리 필요
}

const IconButton = styled(MuiIconButton)(`
  width: 24px;
  height: 24px;
`);

function Clipboard({ value, title }: IClipboardProps): ReactElement {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [tooltipTitle, setTooltipTitle] = useState<string>(t('Clipboard copy'));

  const handleOnCopy = useCallback(() => {
    setTooltipTitle(`${title} ${t('Copied')}`);
    copy(value);
    setIsCopied(true);

    const timeout = setTimeout(() => {
      setShowTooltip(false);
      setIsCopied(false);
      clearTimeout(timeout);
    }, 1000);
  }, [title, t, value]);

  const handleOnMouseEnter = useCallback(() => {
    setTooltipTitle(t('Clipboard copy'));
    setShowTooltip(true);
  }, [t]);

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
