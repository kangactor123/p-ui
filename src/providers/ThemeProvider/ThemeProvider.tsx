import React, { PropsWithChildren } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import { PlayceTheme, getEmotionTheme, getMUITheme } from '../../common/theme';
import GlobalStyle from '../../common/global-style';

export interface ThemeProviderProps extends PropsWithChildren {
  theme: PlayceTheme['palette'];
}

export function ThemeProvider({ theme: projectPalette, children }: ThemeProviderProps) {
  const emotionTheme = getEmotionTheme(projectPalette);

  return (
    <EmotionThemeProvider theme={emotionTheme}>
      <MUIThemeProvider theme={getMUITheme(emotionTheme)}>
        <GlobalStyle />
        {children}
      </MUIThemeProvider>
    </EmotionThemeProvider>
  );
}
export default ThemeProvider;
