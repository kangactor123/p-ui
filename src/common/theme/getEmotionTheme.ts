import { Theme as EmotionTheme } from '@emotion/react';
import { defaultTheme, PlayceTheme } from './defaultTheme';

export const getEmotionTheme = (projectPalette: Partial<PlayceTheme['palette']>): EmotionTheme => ({
  palette: {
    main: {
      ...defaultTheme.palette.main,
      ...projectPalette?.main,
    },
    sub: {
      primary: {
        ...defaultTheme.palette.sub.primary,
        ...projectPalette?.sub?.primary,
      },
      navy: {
        ...defaultTheme.palette.sub.navy,
        ...projectPalette?.sub?.navy,
      },
      green: {
        ...defaultTheme.palette.sub.green,
        ...projectPalette?.sub?.green,
      },
      purple: {
        ...defaultTheme.palette.sub.purple,
        ...projectPalette?.sub?.purple,
      },
    },
    content: {
      ...defaultTheme.palette.content,
      ...projectPalette?.content,
    },
    icon: {
      ...defaultTheme.palette.icon,
      ...projectPalette?.icon,
    },
    surface: {
      ...defaultTheme.palette.surface,
      ...projectPalette?.surface,
    },
    greyScale: {
      ...defaultTheme.palette.greyScale,
      ...projectPalette?.greyScale,
    },
    text: {
      ...defaultTheme.palette.text,
      ...projectPalette?.text,
    },
    line: {
      ...defaultTheme.palette.line,
      ...projectPalette?.line,
    },
    lnb: {
      ...defaultTheme.palette.lnb,
      ...projectPalette?.lnb,
    },
    aLink: {
      ...defaultTheme.palette.aLink,
      ...projectPalette?.aLink,
    },
  },
  typo: defaultTheme.typo,
});
