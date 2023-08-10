import '@emotion/react';
import { PaletteColor, PaletteColorOptions } from '@mui/material';
import { PlayceTheme } from './defaultTheme';

declare module '@emotion/react' {
  export interface Theme extends PlayceTheme {}
}

declare module '@mui/material' {
  interface Palette {
    white: PaletteColor;
  }

  interface PaletteOptions {
    white: PaletteColorOptions;
  }
  interface ButtonPropsColorOverrides {
    grey: true;
    white: true;
  }

  interface FormControlPropsSizeOverrides {
    large: true;
  }
}
