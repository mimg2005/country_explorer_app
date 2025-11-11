import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../assets/en.json';
import faTranslation from '../assets/fa.json';
import { useLanguageStore } from '../store/useLanguageStore';

const initialLang = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      fa: {
        translation: faTranslation,
      },
    },
    lng: initialLang, // Use the language from store/localStorage
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

// Set initial dir attribute
document.documentElement.setAttribute('lang', initialLang);
document.documentElement.setAttribute('dir', initialLang === 'fa' ? 'rtl' : 'ltr');

export default i18n;