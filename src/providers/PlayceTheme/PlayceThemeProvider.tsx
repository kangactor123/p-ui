import React, { PropsWithChildren } from 'react';
import { PlayceTheme, PlayceThemeContext } from './PlayceTheme';

export interface IPlayceThemeProps extends PropsWithChildren {
  theme: PlayceTheme;
}

export function PlayceThemeProvider({ children, theme }: IPlayceThemeProps) {
  return <PlayceThemeContext.Provider value={theme}>{children}</PlayceThemeContext.Provider>;
}
