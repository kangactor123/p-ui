import React, { PropsWithChildren, ReactElement, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../i18n';

export interface ITranslationProps extends PropsWithChildren {
  language: string;
}

export function TranslationProvider({ children, language = 'en' }: ITranslationProps): ReactElement {
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
