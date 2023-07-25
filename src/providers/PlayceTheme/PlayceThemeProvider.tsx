import React, { PropsWithChildren } from 'react';
import { PlayceThemeContenxtProps, PlayceThemeContext } from './PlayceThemeContext';

export interface IPlayceThemeProps extends PropsWithChildren {
  theme: PlayceThemeContenxtProps;
}

export function PlayceThemeProvider({ children, theme: emotionTheme }: IPlayceThemeProps) {
  return <PlayceThemeContext.Provider value={emotionTheme}>{children}</PlayceThemeContext.Provider>;
}
