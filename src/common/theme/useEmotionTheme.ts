import { Theme as EmotionTheme } from '@emotion/react';
import { useContext } from 'react';
import { PlayceThemeContext } from '../../providers';
import { defaultTheme, PlayceTheme } from './defaultTheme';

export const useEmotionTheme = (palette?: Partial<PlayceTheme['palette']>): EmotionTheme => {
  const projectPaletteContext = useContext(PlayceThemeContext);
  const projectPalette = palette || projectPaletteContext;

  return {
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
  };
};
