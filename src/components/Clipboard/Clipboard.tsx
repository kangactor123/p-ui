import React, { ReactElement, ReactNode, useCallback, useContext, useState } from 'react';
import { IconButton as MuiIconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import copy from 'copy-to-clipboard';
import styled from '@emotion/styled';
import { DuplicateCopyIcon } from '../icons';
import { useTranslation } from 'react-i18next';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

export interface IClipboardProps {
  value: string;
  title: string;
}

const IconButton = styled(MuiIconButton)(`
  width: fit-content;
  height: fit-content;
`);

function Clipboard({ value, title }: IClipboardProps): ReactElement {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [tooltipTitle, setTooltipTitle] = useState<NonNullable<ReactNode>>(t('Clipboard copy'));
  const theme = useContext(PlayceThemeContext);

  const handleOnCopy = useCallback(() => {
    setTooltipTitle(`${title} ${t('Copied')}`);
    copy(value);
    setIsCopied(true);

    const timeout = setTimeout(() => {
      setShowTooltip(false);
      setIsCopied(false);
      clearTimeout(timeout);
    }, 1000);
  }, [t, title, value]);

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
    <ThemeProvider theme={theme}>
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
          <DuplicateCopyIcon />
        </IconButton>
      </Tooltip>
    </ThemeProvider>
  );
}

export default Clipboard;
