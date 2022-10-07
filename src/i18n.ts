import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import intervalPlural from 'i18next-intervalplural-postprocessor';

import translationEN from './locales/en/translation.json';
import translationKO from './locales/ko/translation.json';

// utf8 문자열의 경우 기본 plural에 문제가 있어 intervalPlural을 사용함
intervalPlural.setOptions({
  // these are the defaults
  intervalSeparator: ';',
  intervalRegex: /\((\S*)\).*?\[((.|\n)*)\]/, // pre 3.0 /\((\S*)\).*{((.|\n)*)}/,
  intervalSuffix: '_interval',
});

const resources = {
  ko: {
    translation: translationKO,
  },
  'ko-KR': {
    translation: translationKO,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // interval plural
  .use(intervalPlural)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    keySeparator: '::',
    nsSeparator: '||',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: { useSuspense: false },
  });

export default i18n;
