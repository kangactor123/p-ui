import React, { ReactElement, useCallback, useMemo } from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconBackButton } from '../icons';
import { IBackButton } from './type';

function BackButton({ to, options }: IBackButton): ReactElement {
  const navigate = useNavigate();
  // eslint-disable-next-line no-restricted-globals
  const isFirstPage = useMemo(() => history.length === 1, []);

  const handleBack = useCallback(() => {
    navigate(to, options);
  }, [navigate, to, options]);

  return (
    <IconButton onClick={handleBack} disableRipple={isFirstPage}>
      <IconBackButton />
    </IconButton>
  );
}

export default BackButton;
