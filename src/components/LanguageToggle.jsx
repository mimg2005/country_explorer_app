import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../store/useLanguageStore';

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'fa' ? 'rtl' : 'ltr');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 dark:bg-blue-700 dark:hover:bg-blue-800"
    >
      {language === 'en' ? 'فارسی' : 'English'}
    </button>
  );
};

export default LanguageToggle;