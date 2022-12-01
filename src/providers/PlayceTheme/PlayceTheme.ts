import { Theme, ThemeOptions, createTheme } from '@mui/material';
import { createContext } from 'react';

export type PlayceTheme = Theme | ThemeOptions | undefined;

const defaultTheme = createTheme({});

export const PlayceThemeContext = createContext<PlayceTheme>(defaultTheme);
