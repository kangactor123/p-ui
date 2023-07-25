import React from 'react';
import { css, Global } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box !important;
        letter-spacing: 0.1px !important;
      }
    `}
  />
);

export default GlobalStyle;
