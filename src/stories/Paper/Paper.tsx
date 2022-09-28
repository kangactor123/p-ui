import React, { ReactElement } from 'react';
import { Paper as MuiPaper, PaperProps } from '@mui/material';

export type TPaperProps = PaperProps;

export function Paper(props: TPaperProps): ReactElement {
  return <MuiPaper {...props} />;
}

export default Paper;
