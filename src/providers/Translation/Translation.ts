import { i18n } from 'i18next';
import { createContext } from 'react';

export const TranslationContext = createContext<i18n | undefined>(undefined);