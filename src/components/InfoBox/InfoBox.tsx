import React, { ReactElement, ReactNode, useState } from 'react';
import { Size } from '../../common/enum';
import { useEmotionTheme } from '../../common/theme';
import { ThemeProvider } from '../../providers';
import Button from '../Button';
import {
  InfoBoxSuccessIcon,
  InfoBoxPositiveIcon,
  InfoBoxWarningIcon,
  InfoBoxNegativeIcon,
  CloseSmallGrey100Icon,
} from '../icons';
import { closeIcon, Content, InfoBoxWrap, statusIcon, Title } from './style';

export enum InfoStatus {
  Success = 'success',
  Positive = 'positive',
  Warning = 'warning',
  Negative = 'negative',
}

export interface InfoBoxProps {
  status?: InfoStatus;
  title?: string;
  content?: ReactNode;
  isOpen?: boolean;
  onClickClose?: () => void;
}

function InfoBox({
  status = InfoStatus.Success,
  title = '',
  content = '',
  isOpen = true,
  onClickClose,
}: InfoBoxProps): ReactElement {
  const emotionTheme = useEmotionTheme();
  const [open, setOpen] = useState<boolean>(isOpen);

  const getStatusIcon: { [key: string]: ReactElement } = {
    success: <InfoBoxSuccessIcon />,
    positive: <InfoBoxPositiveIcon />,
    warning: <InfoBoxWarningIcon />,
    negative: <InfoBoxNegativeIcon />,
  };

  const handleClickClose = () => {
    setOpen((open) => !open);

    if (onClickClose instanceof Function) {
      onClickClose();
    }
  };

  return (
    <ThemeProvider>
      {open && (
        <InfoBoxWrap theme={emotionTheme} status={status}>
          <Title theme={emotionTheme}>
            <span css={statusIcon}>{getStatusIcon[status]}</span>
            <span>{title}</span>
            <Button
              variant="text"
              color="secondary"
              size={Size.S}
              onlyIcon
              css={closeIcon}
              onClick={handleClickClose}
            >
              <CloseSmallGrey100Icon />
            </Button>
          </Title>
          {content && <Content theme={emotionTheme}>{content}</Content>}
        </InfoBoxWrap>
      )}
    </ThemeProvider>
  );
}

export default InfoBox;
