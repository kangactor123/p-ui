import React, { ReactElement } from 'react';
import { css } from '@emotion/react';
import { Box, LinearProgress, Typography } from '@mui/material';
// import { useTranslation } from 'react-i18next';

export interface IProgressbarProps {
  //Todo: define props
  className?: string;
  value: number;
  isLabel?: boolean;
  progressColor?: string;
  backgroundColor?: string;
}

const wrapper = css`
  width: 100%;
  position: relative;
`;

function Progressbar(props: IProgressbarProps): ReactElement {
  const { className, value, isLabel = true, backgroundColor, progressColor } = props;

  const muiBox = css`
    margin-right: '0px';
  `;

  const muiProgress = css`
    border-radius: 4px;
    height: 16px;
    background-color: ${backgroundColor};

    & > span {
      background-color: ${progressColor};
    }
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
