import React, { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { css } from '@emotion/react';
import { IBlankLinkProps } from './type';
import { PlayceThemeContext, ThemeProvider } from '../../providers';

function BlankLink({ children, isForwardIcon = false, ...props }: IBlankLinkProps): ReactElement {
  const theme = useContext(PlayceThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <Link
        css={css`
          display: flex;
          color: #4285f4;
          align-items: center;
          flex-direction: ${isForwardIcon ? 'row-reverse' : 'row'};
          margin-left: ${isForwardIcon ? '0px' : '5px'};
          margin-right: ${isForwardIcon ? '5px' : '0px'};
          text-decoration: none;
        `}
        target="_blank"
        {...props}
      >
        {children}
        <LaunchIcon
          fontSize="small"
          css={css`
            margin-left: ${isForwardIcon ? '0px' : '5px'};
            margin-right: ${isForwardIcon ? '5px' : '0px'};
          `}
        />
      </Link>
    </ThemeProvider>
  );
}

export default BlankLink;
