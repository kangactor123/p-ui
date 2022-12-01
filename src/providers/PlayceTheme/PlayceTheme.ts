import { Theme, createTheme } from '@mui/material';
import { createContext } from 'react';

export type PlayceTheme = Theme | undefined;

const defaultTheme = createTheme({});

export const PlayceThemeContext = createContext<PlayceTheme>(defaultTheme);
