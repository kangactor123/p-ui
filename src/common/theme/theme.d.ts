import '@emotion/react';
import { PlayceTheme } from './defaultTheme';

declare module '@emotion/react' {
  export interface Theme extends PlayceTheme {}
}

declare module '@mui/material' {
  // interface ButtonPropsColorOverrides {
  //   grey: true;
  // }
}
