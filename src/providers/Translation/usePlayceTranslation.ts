import { useContext } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { TranslationContext } from './Translation';

export function usePlayceTranslation(): UseTranslationResponse<"translation", undefined> {
  const i18n = useContext(TranslationContext);
  return useTranslation('translation', { i18n });
}
