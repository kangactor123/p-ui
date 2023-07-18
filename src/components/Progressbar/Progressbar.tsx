import React, { ReactElement } from 'react';
import { css } from '@emotion/react';
import { Box, LinearProgress, Typography } from '@mui/material';

const wrapper = css`
  width: 100%;
  position: relative;
`;

const muiTypography = css`
  color: #ffffff;
  font-size: 11px;
  font-weight: bold;
`;

const labelBox = css`
  position: absolute;
  left: 49%;
  top: 1px;
`;

const muiBox = css`
  margin-right: 0px;
`;

export interface IProgressbarProps {
  value: number;
  className?: string;
  isLabel?: boolean;
  progressColor?: string;
  backgroundColor?: string;
}

function Progressbar(props: IProgressbarProps): ReactElement {
  const { className, value, isLabel = false, backgroundColor, progressColor } = props;

  const muiProgress = css`
    border-radius: 50px;
    height: 8px;
    background-color: ${backgroundColor};

    & > span {
      background-color: ${progressColor};
    }
  `;

  return (
    <div css={wrapper} className={className}>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1} css={muiBox}>
          <LinearProgress variant="determinate" value={value} css={muiProgress} />
        </Box>
        {isLabel ? (
          <Box css={labelBox} minWidth={35}>
            <Typography css={muiTypography} variant="body2" color="textSecondary">
              {`${Math.round(value)}%`}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </div>
  );
}

export default Progressbar;
