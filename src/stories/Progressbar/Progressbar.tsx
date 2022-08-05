/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { css } from '@emotion/react';
import { Box, LinearProgress, Typography } from '@mui/material';
// import { useTranslation } from 'react-i18next';

export interface IProgressbarProps {
  //Todo: define props
  className?: string;
  value: number;
  isWidgetProgress?: boolean;
  isLabel?: boolean;
}

const wrapper = css`
  width: 100%;
  position: relative;
`;

const muiBox = css`
  margin-right: '0px';
`;

const muiProgress = css`
  border-radius: 4px;
  height: 16px;
`;

const muiTypography = css`
  color: #ffffff;
  font-size: 11px;
  font-weight: bold;
`;

const widgetProgressLabelBox = css`
  position: absolute;
  left: 44%;
`;

const labelBox = css`
  position: absolute;
  left: 49%;
  top: 1px;
`;

function Progressbar(props: IProgressbarProps): ReactElement {
  // const { t } = useTranslation();
  const { className, value, isWidgetProgress, isLabel = true } = props;

  return (
    <div css={wrapper} className={className}>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1} css={muiBox}>
          <LinearProgress variant="determinate" value={value} css={muiProgress} />
        </Box>
        {isLabel ? (
          <Box css={isWidgetProgress ? widgetProgressLabelBox : labelBox} minWidth={35}>
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
