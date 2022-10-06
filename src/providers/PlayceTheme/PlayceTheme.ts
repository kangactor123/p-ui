import { ThemeOptions } from '@mui/material';
import { createContext } from 'react';

export type PlayceTheme = ThemeOptions | undefined;

export const PlayceThemeContext = createContext<PlayceTheme>(undefined);