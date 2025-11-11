import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-md mb-6 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('app_title')}</h1>
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;