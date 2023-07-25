import { createContext } from 'react';
import { PlayceTheme } from '../../common/theme';

export type PlayceThemeContenxtProps = PlayceTheme['palette'];

export const PlayceThemeContext = createContext<PlayceTheme['palette']>(
  {} as PlayceTheme['palette'],
);
