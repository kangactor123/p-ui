import React, { ReactElement, useCallback, useContext, useMemo } from 'react';
import { css, IconButton, Theme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconBackButton } from '../icons';
import { IBackButton } from './type';
import { PlayceThemeContext } from '../../providers';

const iconButtonCss = css`
  margin-right: 3px;
`;

function BackButton({ to, options }: IBackButton): ReactElement {
  const navigate = useNavigate();
  // eslint-disable-next-line no-restricted-globals
  const isFirstPage = useMemo(() => history.length === 1, []);
  const theme = useContext(PlayceThemeContext);

  const handleBack = useCallback(() => {
    navigate(to, options);
  }, [navigate, to, options]);

  return (
    <ThemeProvider theme={theme as Theme}>
      <IconButton onClick={handleBack} disableRipple={isFirstPage} css={iconButtonCss}>
        <IconBackButton />
      </IconButton>
    </ThemeProvider>
  );
}

export default BackButton;
