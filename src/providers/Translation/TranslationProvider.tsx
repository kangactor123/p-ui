import React, { PropsWithChildren, ReactElement } from 'react';
import { i18n as Ti18n } from 'i18next';

import translationEN from '../../locales/en/translation.json';
import translationKO from '../../locales/ko/translation.json';

export interface ITranslationProps extends PropsWithChildren {
  i18n: Ti18n;
}

export function TranslationProvider({ children, i18n }: ITranslationProps): ReactElement {
  i18n.addResources('en', 'translation', translationEN);
  i18n.addResources('ko', 'translation', translationKO);
  i18n.addResources('ko-KR', 'translation', translationKO);
  return <>{children}</>;
}
