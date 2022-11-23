import React, { PropsWithChildren, ReactElement, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../i18n';

export interface ITranslationProps extends PropsWithChildren {
  language: string;
  resources?: any;
}

export function TranslationProvider({ children, language = 'en', resources }: ITranslationProps): ReactElement {
  useEffect(() => {
    if (resources) {
      i18n.addResources('en', 'translation', resources.en?.translation || {});
      i18n.addResources('ko', 'translation', resources.ko?.translation || {});
      i18n.addResources('ko-KR', 'translation', resources['ko-KR']?.translation || {});
    }
  }, [resources]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
